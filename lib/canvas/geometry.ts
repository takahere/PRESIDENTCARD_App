/**
 * 遷移図の座標計算ユーティリティ
 *
 * スクリーン間の矢印パスを計算
 */

import type { ScreenPosition } from "./types";

interface Point {
  x: number;
  y: number;
}

interface ConnectionPath {
  start: Point;
  end: Point;
  path: string; // SVG path d属性
}

/**
 * 2つのスクリーン間の接続パスを計算
 *
 * スクリーンの相対位置に応じて最適な接続点を決定し、
 * ベジェ曲線のパスを生成
 */
export function calculateConnectionPath(
  from: ScreenPosition,
  to: ScreenPosition
): ConnectionPath {
  // スクリーンの中心点
  const fromCenter = {
    x: from.x + from.width / 2,
    y: from.y + from.height / 2,
  };
  const toCenter = {
    x: to.x + to.width / 2,
    y: to.y + to.height / 2,
  };

  // 相対位置を判定
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;

  let start: Point;
  let end: Point;
  let controlOffset: number;

  if (Math.abs(dx) > Math.abs(dy)) {
    // 水平方向が主（左右に配置）
    if (dx > 0) {
      // toがfromの右側
      start = { x: from.x + from.width, y: fromCenter.y };
      end = { x: to.x, y: toCenter.y };
    } else {
      // toがfromの左側
      start = { x: from.x, y: fromCenter.y };
      end = { x: to.x + to.width, y: toCenter.y };
    }
    controlOffset = Math.min(Math.abs(dx) * 0.4, 80);
  } else {
    // 垂直方向が主（上下に配置）
    if (dy > 0) {
      // toがfromの下側
      start = { x: fromCenter.x, y: from.y + from.height };
      end = { x: toCenter.x, y: to.y };
    } else {
      // toがfromの上側
      start = { x: fromCenter.x, y: from.y };
      end = { x: toCenter.x, y: to.y + to.height };
    }
    controlOffset = Math.min(Math.abs(dy) * 0.4, 80);
  }

  // ベジェ曲線の制御点を計算
  const path = generateBezierPath(start, end, controlOffset);

  return { start, end, path };
}

/**
 * ベジェ曲線のSVGパスを生成
 */
function generateBezierPath(
  start: Point,
  end: Point,
  controlOffset: number
): string {
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  let cp1: Point;
  let cp2: Point;

  if (Math.abs(dx) > Math.abs(dy)) {
    // 水平方向が主
    cp1 = { x: start.x + controlOffset, y: start.y };
    cp2 = { x: end.x - controlOffset, y: end.y };
  } else {
    // 垂直方向が主
    cp1 = { x: start.x, y: start.y + controlOffset * Math.sign(dy) };
    cp2 = { x: end.x, y: end.y - controlOffset * Math.sign(dy) };
  }

  return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
}

/**
 * スクリーン位置マップを生成
 *
 * DOM要素の位置からスクリーン位置情報を収集
 */
export function collectScreenPositions(
  containerRef: HTMLElement,
  screenRefs: Map<string, HTMLElement>
): Map<string, ScreenPosition> {
  const positions = new Map<string, ScreenPosition>();
  const containerRect = containerRef.getBoundingClientRect();

  screenRefs.forEach((element, path) => {
    const rect = element.getBoundingClientRect();
    positions.set(path, {
      path,
      x: rect.left - containerRect.left + containerRef.scrollLeft,
      y: rect.top - containerRect.top + containerRef.scrollTop,
      width: rect.width,
      height: rect.height,
    });
  });

  return positions;
}

/**
 * 矢印マーカーのサイズ調整
 */
export function getArrowMarkerSize(zoom: number): {
  width: number;
  height: number;
  refX: number;
} {
  const baseSize = 10;
  return {
    width: baseSize,
    height: baseSize,
    refX: baseSize,
  };
}
