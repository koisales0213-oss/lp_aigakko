# かざあな隊｜大手飲食チェーン開拓LP

大手飲食チェーン本部の開拓を狙う事業者に向けた、かざあな隊の業界特化ランディングページです。

**公開URL：** https://koisales0213-oss.github.io/lp_aigakko/

## 構成

```
index.html              LP本体（1ページ完結）
assets/css/style.css    スタイル
assets/js/main.js       追従CTA・スクロール表示・FAQ開閉・フォーム制御
docs/LP設計メモ.md      設計意図・コピーの出典・未対応事項
docs/映像生成プロンプト.md  ヒーロー背景／SNS広告用の動画生成プロンプト
PROGRESS.md             作業ログ（再開時はここから）
```

外部CDN・外部フォント・ビルドツールへの依存はありません。`index.html` をブラウザで開けばそのまま動きます。

## 開発

```bash
open index.html          # そのまま開く
python3 -m http.server   # ローカルサーバーで確認する場合（http://localhost:8000）
```

`main` に push すると GitHub Pages へ自動反映されます（反映まで1〜2分）。

## 注意

このリポジトリは **Public** です。クライアント実名・受注金額など社外に出せない情報はコミットしないでください。
