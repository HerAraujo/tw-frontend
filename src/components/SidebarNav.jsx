import { OverlayTrigger, Tooltip } from "react-bootstrap";

function SidebarNav() {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Not Avaible
    </Tooltip>
  );
  return (
    <nav className="navbar r-sidebar-search-nav ">
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <form className="r-sidebar-search-nav w-100">
          <input
            className="form-control r-sidebar-search-input rounded-pill px-4"
            type="search"
            placeholder={`Search Twitter`}
            aria-label="Search"
          />
        </form>
      </OverlayTrigger>
    </nav>
  );
}

export default SidebarNav;
