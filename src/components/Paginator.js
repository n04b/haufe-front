import "./Paginator.scss";
import { Link } from "react-router-dom";

const pagesNumGen = (currentPage, lastPage) => {
  if (!currentPage || !lastPage) {
    return [];
  }

  let startFrom = parseInt(currentPage) - 3;
  if (startFrom < 1) {
    startFrom = 1;
  }
  if (parseInt(currentPage) + 3 >= lastPage) {
    startFrom = lastPage - 6;
  }

  const arr = new Array(7)
    .fill(undefined)
    .map((item, index) => startFrom + index);

  if (arr[0] > 1) {
    arr.unshift(undefined);
  }
  if (arr[arr.length - 1] < lastPage) {
    arr.push(undefined);
  }

  return arr;
};

const Paginator = ({ page, totalPages }) => {
  return (
    <div className="Paginator">
      {pagesNumGen(page, totalPages).map((item, index) => {
        switch (item) {
          case undefined:
            return (
              <span className="item" key={index}>
                ...
              </span>
            );

          case parseInt(page):
            return (
              <span className="item current" key={index}>
                {item}
              </span>
            );

          default:
            return (
              <Link className="item" to={`/page/${item}`} key={index}>
                {item}
              </Link>
            );
        }
      })}
    </div>
  );
};

export default Paginator;
