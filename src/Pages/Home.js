import React, { useState, useEffect } from "react";
import "./styles/Home.css"

const Home = () => {
  const [List, setList] = useState(JSON.parse(localStorage.getItem("List")) || {});  // 裝 Todo 代辦清單
  const [ComleteList, setComleteList] = useState(JSON.parse(localStorage.getItem("ComleteList")) || {});  // 裝 Todo 完成清單
  const [input, setInput] = useState(""); // 裝使用者輸入


  // 加入內容至清單
  const HandlerAdd = ((value) => {
    if (value !== "") {
      setList((pre) => ({ ...pre, [value]: { Edit: true, CheckBox: false } }));
      setInput("");
    }
  })


  useEffect(() => {
    // 將使用者輸入的值存入 localStorage
    localStorage.setItem("List", JSON.stringify(List));
    localStorage.setItem("ComleteList", JSON.stringify(ComleteList));
  }, [List, ComleteList])




  // 刪除該項目
  const HandlerClear = ((value) => {
    setList((pre) => {
      const { [value]: deleted, ...UpdatePre } = pre;
      return UpdatePre;
    });
  })

  // 打開/關閉編輯項目
  const HandlerEdit = ((item) => {
    let list = {};
    setList((pre) => {
      // 開啟所有項目disabled
      Object.keys(pre).map((item1) => {
        list = { ...list, [item1]: true }
      })
      // 只關閉選擇disabled
      list = { ...list, [item]: false }

      return list;
    })
  })

  // 項目改變值
  const HandlerChangeInp = (item, newKey) => {
    setList(prevList => {
      const updatedList = { ...prevList };

      // 新增物件 取代舊物件
      updatedList[newKey] = updatedList[item];

      // 刪除舊物件
      delete updatedList[item];

      return updatedList;
    });
  };


  // 移動代辦項目到完成項目
  const HandlerCheckBoxOn = (item) => {

    // 將該代辦事項資料 挪到 完成事項
    setComleteList((pre) => ({ ...pre, [item]: { Edit: true, CheckBox: true } }));

    // 刪除原先代辦事項資料
    setList((pre) => {
      const { [item]: deleted, ...UpdatePre } = pre;
      return UpdatePre;
    });
  }


  // 完成項目移動到代辦項目
  const HandlerCheckBoxOff = (item) => {

    // 將該完成事項資料 挪到 代辦事項
    setList((pre) => ({ ...pre, [item]: { Edit: true, CheckBox: false } }));

    // 刪除原先完成事項資料
    setComleteList((pre) => {
      const { [item]: deleted, ...UpdatePre } = pre;
      return UpdatePre;
    });

  }



  return (
    <div className="Home">
      <img className="BackGroundImg" src="https://picsum.photos/2000/1500/?blur" alt="" />
      <div className="HomeConianer">
        <div>
          <h1 className="MainTitle">Todo List</h1>
          <div className="">
            <input id="Input" className="Input" type="text" placeholder="add Todo..."
              onKeyDown={e => {
                if (e.key === "Enter") {
                  HandlerAdd(input);
                }
              }}
              value={input} onChange={(e) => { setInput(e.target.value) }} />
            <button className="" onClick={() => HandlerAdd(input)} ><i class="bi bi-plus-lg"></i></button>
          </div>
        </div>

        {console.log(List)}

        <div className="row m-1">
          {/* 代辦事項 */}
          <div className="col-6 standby">
            <h2 className="MainTitle">代辦事項</h2>
            {
              List && Object.keys(List).map((item) => {
                let EditDisabled = List[item];
                return (
                  <div className="m-1 standbyContainer">
                    <input className="me-2" type="checkbox" id="" name="" checked={false} onChange={() => HandlerCheckBoxOn(item)} />
                    <input className="w-auto me-1" value={item} disabled={EditDisabled} onChange={(e) => HandlerChangeInp(item, e.target.value)} />
                    <button className="w-auto me-1" onClick={() => HandlerEdit(item)} ><i class="bi bi-pencil"></i></button>
                    <button className="w-auto" onClick={() => HandlerClear(item)} ><i class="bi bi-trash"></i></button>
                  </div>
                )
              })
            }
          </div>

          {/* 已辦事項 */}
          <div className="col-6 complete">
            <h2 className="MainTitle">完成事項</h2>
            {
              ComleteList && Object.keys(ComleteList).map((item) => {
                return (
                  <div className="m-1">
                    <input className="me-2" type="checkbox" id="" name="" checked={true} onChange={() => HandlerCheckBoxOff(item)} />
                    <input className="w-75" value={item} disabled />
                  </div>
                )
              })
            }
          </div>

        </div>
      </div>
    </div >
  );
}

export default Home