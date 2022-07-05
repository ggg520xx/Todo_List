// 資料初始化  刪除修改做任何事情 資料顯示出來要規劃自己的資料格式
// 透過js產生那些結構  在需要展示位置上
// -----------------------------------------------

// 資料格式
let data = [
  // {
  //   "content": '待辦事件一'
  // }
  // ,
  // {
  //   "content": '待辦事件二'

  // },
  // {
  //   "content": '吃晚餐'

  // }
]


function renderData() {
  let str = "";
  data.forEach(function (item, index) {        // 跑for each 把資料都顯示出    // 有幾筆 函式就跑幾筆

    str = str + ` <li>${item.content}<input type="button"  data-num="${index}" class="delete" value="刪除此待辦"></li>`
    // 空值存放 空值= 空值+上我的資料集    放入html結構和抓出我的data內容

  })
  console.log(str);  // 寫完上述後 檢查有沒有組好 結構和字串 for each 進到str 變數  // 有的話就用 innerHTML 顯現在網頁

  const list = document.querySelector('.list')
  list.innerHTML = str;
  // 就把我的初始資料加上去了
  // 原本 html 還有一筆資料  但現在用js抓我的資料 innerHTML會把資料清空 再把組好字串放進去

}
// renderData(); // 預設執行一次就初始化



// -----------------------------------------------以上為初始化原始資料   再使用函式func renderData 包住   以便之後執行行為
// -----------------------------------------------

// 上方定義好資料格式  我們再新增一筆資料
// 有個物件 裡面放屬性 有對應的值 推進陣列內 把值取出來

// 新增邏輯 有新的就 push   一筆物件資料 在data 
// 組好陣列資料都顯示在ul

// 抓取那兩個關於新增的dom  txt 和 save


const type_txt = document.querySelector('.txt');
const click_save = document.querySelector('.save');
// 取值綁監聽
// 按下儲存待辦就能新增資料 下方就會顯示


click_save.addEventListener('click', function (e) {       //  點擊位置的監聽 當這顆按鈕被點擊  
  // 就要做把文字欄位值取出來 組物件 存入丟到data裡面

  if (type_txt.value == "") {              //  先做了檢查 如果輸入欄位是空的
    alert('請輸入點什麼吧')
    return;                                // 沒有內容就跑這行 碰return中斷
  }

  console.log(type_txt.value)               // 取得值不外乎就是要 處理組成物件格式 再push到data資料狀態內


  // ------------------------------
  // {
  //   "content": '吃晚餐'
  // }

  let data_info_obj = {};
  data_info_obj.content = type_txt.value        // 變數存放 input 輸入的值 非空的話就存入物件
  // data_info_obj.content  這串組好物件格式了   那個物件變數 的content
  console.log(data_info_obj);          // 抓到後push到陣列裡頭內

  data.push(data_info_obj);                // push誰 那個 obj變數content 存放的   value

  renderData();
  // 確保有值的話 會執行這串一次函式組物件 推進data陣列 執行render for each   innerHTML出來
  // data 預設假資料 改為一個空陣列 就可以看起來新增
  // 不管按2次3次 都會執行最後面 push結束 再重新清空把資料填上去
})

// -----------------------------------------------

// 刪除功能 使用到 陣列的splice 刪除指定資料-------------------------------------

// let xx = ['a','b','c'];

// 第一個數字起始位置   第二個數字自此位置刪除幾筆資料
// xx.splice(0,1);
// console.log(xx);


// 取值出來 帶到 splice 的第一個參數 刪除第幾筆 帶到裡面-1 為刪除該筆資料
// 問題在於怎麼把 1.2.3數字帶進去每一筆不重複輸入的資料
// 用到forEach的特性 去增加 index索引值(陣列的第幾筆資料)   並將他填入 data-num="${index}" 上  產生每一筆都是不重複的索引值
// 就能取出data-num 搭配 splice

// 簡單流程
// 流程 forEach 填入每一筆索引值  放到 data=num上每一筆索引    然後取出個別個索引值  放到splice上刪除


// 針對list 綁監聽 如果我按到 刪除待辦 才執行刪除行為
// 如果不是按到刪除待辦 就return中斷   也就是沒反應  確定點到刪除才刪
const list = document.querySelector('.list');
list.addEventListener('click', function (e) {
  console.log(e.target.nodeName)                   // 確保有作對顯示 UL LI INPUT

  if (e.target.getAttribute('class') !== 'delete') {
    alert('你點歪了');
    return;         // 如果不是點到 有刪除class 的 就return  當作沒事
  }

  let num = e.target.getAttribute('data-num');
  // console.log(num);         // 有正確提取到 個別的 索引值 成為個別的data-num 
  data.splice(num, 1);     // 刪除該筆1筆資料
  renderData();    // 再次執行   點擊刪除 其實陣列刪除了 重跑 forEach重新賦予index 但畫面沒有更新
})
