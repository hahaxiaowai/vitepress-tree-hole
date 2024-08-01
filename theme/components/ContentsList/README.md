# ContentsList 内容展示列表
用于目录展示的容器组件
## API
| 属性名 | 说明 | 类型 | Default |
| :--------: | :-------: | :----------: | :-: |
| dataList | 目录数据 | Post[] | []
## 配置
``` ts
/**
 * @default isBlogImages:false
 * @default imagesSize:medium
 * @default imagesLocation:center
 * @description Set blog image style
 * @description imagesSize small : 小图｜medium : 中图｜large : 大图
 * @description imagesLocation left : 左｜right : 右｜center : 中 | reversal : 左右交替 | leftRight : 左右
 */
blogList?: {
  isBlogImages?: boolean;
  imagesSize?: "small" | "medium" | "large";
  imagesLocation?: "left" | "right" | "center" | "reversal" | "leftRight";
};
```  

## TODO
+ 添加Api控制组件样式
+ 点击图片分开动画