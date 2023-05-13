/*
  NOTE:
    react-hook-formのzodRezolverで、入力値以外の変数を受け取り管理したい場合、
    「値の変化に合わせてuseEffectでsetValueで値を詰める」のがオススメ。

    フォーム処理としてシンプルに、onChangeで入力に合わせて値を変えていくから、
    変数の変化に合わせてはくれない。

    そのため、stateの値をhiddenで持っても変化に追随してくれなかったり、
    数値を持つと、空の場合にnanになって扱いに苦しんだりする
    （空の値が入らない、値が場合によって変わらない定数ならhiddenでも問題ない。）

    ※定義されているものが0になっても、このコメントを残すためにこのファイルは残す。
    どうせこのファイルに行き着くときは同様の問題関心だろうから。
 */

export const convertFromStringToNumOrNull = (value, context) => {
  const parsed = parseInt(value);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
};
