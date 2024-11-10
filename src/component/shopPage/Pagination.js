const Pagination = (props) => {
  return (
    <div>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item disabled">
            <a className="page-link text-dark" href="#" tabIndex="-1">
              &lt;&lt;
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link bg-dark border-dark" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link text-dark" href="#">
              &gt;&gt;
            </a>
          </li>
        </ul>
      </nav>
      <p className="text-secondary">
        Showing 1-8 of {props.products.length} results
      </p>
    </div>
  );
};

export default Pagination;
