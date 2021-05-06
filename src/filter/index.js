//过滤器 ：{{xxx|filters}}
//export 导出
export function date(timestamp) {
    //转化时间戳为 年-月-日格式
    let date = new Date(parseInt(timestamp));

    let year = date.getFullYear();
    let month = date.getMonth() + 1;  //0~11
    let day = date.getDate();

    return `${year}-${month}-${day}`;
}

//然后到 main.js 文件里,注册为全局作用域