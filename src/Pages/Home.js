import React, { useState, useEffect, useRef } from "react";
import "./styles/Home.css"

const Home = () => {
  const [List, setList] = useState(JSON.parse(localStorage.getItem("List")) || {});  // 裝 Todo 代辦清單
  const [ComleteList, setComleteList] = useState(JSON.parse(localStorage.getItem("ComleteList")) || {});  // 裝 Todo 完成清單
  const [input, setInput] = useState(""); // 裝使用者輸入
  let inputRef = useRef('');
  let [PreSelect, setPreSelect] = useState('');
  let [NextSelect, setNextSelect] = useState('');


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
    if (item != newKey) {
      setList(prevList => {
        const updatedList = { ...prevList };

        // 新增物件 取代舊物件
        updatedList[newKey] = updatedList[item];

        // 刪除舊物件
        delete updatedList[item];

        return updatedList;
      });
    }
    else alert("尚未修改事項");
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

        <div className="Left_Right_Main m-1">
          {/* 代辦事項 */}
          <div className="standby">
            <h2 className="MainTitle">代辦事項</h2>
            {
              List && Object.keys(List).map((item) => {
                let EditDisabled = List[item];
                return (
                  <div className="m-1">
                    <input className="checkBox" type="checkbox" id="" name="" checked={false}
                      onChange={() => HandlerCheckBoxOn(item)} />
                    <input className="" value={item} disabled={EditDisabled}
                      ref={inputRef}
                      onBlur={() => HandlerChangeInp(inputRef.current.value)} />


                    {/* <div type="button" className="" data-bs-toggle="modal" data-bs-target="#myModal">
                      <svg xmlns="http:www.w3.org/2000/svg" fill="currentColor" className="bi bi-play-btn PreviewButton" viewBox="0 0 16 16">
                        <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                      </svg>
                    </div> */}


                    <button className="" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => {
                      setPreSelect(item);
                      setNextSelect(item);
                      // HandlerEdit(item);
                    }}>
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button className="" onClick={() => HandlerClear(item)} ><i class="bi bi-trash"></i></button>
                  </div>
                )
              })
            }
          </div>


          {/* 已辦事項 */}
          <div className="complete">
            <h2 className="MainTitle">完成事項</h2>
            {
              ComleteList && Object.keys(ComleteList).map((item) => {
                return (
                  <div className="m-1">
                    <input className="checkbox" type="checkbox" id="" name="" checked={true} onChange={() => HandlerCheckBoxOff(item)} />
                    <input className="" value={item} disabled />
                  </div>
                )
              })
            }
          </div>

        </div>
      </div>

      {/* 修改代辦內容區 */}
      {/* <div className="EditContent">
        <h3>修改代辦內容</h3>
      </div> */}

      {/* 修改代辦內容區 */}
      <div className='EditContent'>
        <div className="modal" id="myModal" >
          <div className="modal-dialog center">
            <div className="modal-content" >
              <div className="modal-body" style={{ height: "auto", minWidth: "15rem" }}>
                {/* <img src="https://t3.ftcdn.net/jpg/05/28/06/40/360_F_528064037_weAP5bkUboFtkQ6DVgiEGndwTQ7XcEZE.jpg" alt="" /> */}
              </div>
              <h3 className="text-center">修改代辦事項!</h3>
              {/* <p>{CurrentSelect}</p> */}
              <input className="text-center content" value={NextSelect} onChange={(e) => {
                setNextSelect(e.target.value)
              }}></input>
              <button data-bs-dismiss="modal" onClick={() => HandlerChangeInp(PreSelect, NextSelect)}>確定修改</button>
              <button data-bs-dismiss="modal">取消修改</button>
            </div>
          </div>
        </div>
      </div >

    </div >
  );
}

export default Home