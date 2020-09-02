const goBaseConfig = {
    nodeStyle: () => {
        return [
            // 将节点位置信息 Node.location 同节点模型数据中 "loc" 属性绑定：
            // 节点位置信息从 节点模型 "loc" 属性获取, 并由静态方法 Point.parse 解析.
            // 如果节点位置改变了, 会自动更新节点模型中"loc"属性, 并由 Point.stringify 方法转化为字符串
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                // 节点位置 Node.location 定位在节点的中心
                locationSpot: go.Spot.Center
            }

        ];
    },
    // 图形上的文字风格
    textStyle: () => {
        return {
            font: "11pt Helvetica, Arial, sans-serif",
            stroke: "#fff",
            textAlign: "center",
        }
    },
    // 右键菜单 文字风格
    ContextMenuTextStyle: () => {
        return {
            height: 24, width: 50, margin: 4, verticalAlignment: go.Spot.Center,
            font: "11pt Helvetica, Arial, sans-serif",
            textAlign: "center",
        }
    },

}
