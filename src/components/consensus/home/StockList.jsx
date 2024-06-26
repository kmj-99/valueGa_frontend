import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URI_PATH } from "~/routers/main-router";
import "./ArrowStyle.css"; // 기존 CSS 파일 import

export default function StockList({ data, type }) {
  const [arrowClass, setArrowClass] = useState("");
  useEffect(() => {
    if (type === "buy") {
      setArrowClass("arrow-icon up");
    } else {
      setArrowClass("arrow-icon down");
    }
  }, [type]);

  return (
    <div>
      <div className="mt-8">
        <div className="flex flex-row text-body2 text-tuatara-200 text-center items-center justify-between h-7 mt-6">
          <div className="flex-1 text-center">종목명</div>
          <div className="flex-1 text-center">현재 상승 여력</div>
          <div className="flex-1 text-center">현재 주가</div>
          <div className="flex-1 text-center">목표 주가</div>
        </div>

        {data?.map((element, index) => {
          return (
            <Link
              to={`${URI_PATH.consensusPage}/${element.stock_code}`}
              state={{
                companyName: element.company_name,
                type: type,
              }}
            >
              <div className="flex justify-between items-center text-tuatara-50 text-caption flex-row text-center rounded-lg h-16 m-2 bg-tuatara-950">
                <div className="flex flex-row w-full items-center justify-between">
                  <div className="flex-1 text-center">
                    {element.company_name}
                  </div>

                  <div className="flex-1 flex flex-row space-x-2 items-center justify-center">
                    <div className={arrowClass} />
                    <div>
                      {(element.target_price / element.currentPrice).toFixed(2)}
                      %
                    </div>
                  </div>

                  <div className="flex-1 text-center">
                    {element.currentPrice}원
                  </div>

                  <div className="flex-1 flex flex-row space-x-2 items-center justify-center">
                    <img src={arrowClass} className="w-3 h-3" />
                    <div>{element.target_price}원</div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
