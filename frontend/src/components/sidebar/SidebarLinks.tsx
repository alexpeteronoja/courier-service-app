// import { sideBarContent } from '../../utils/routeMaps';
import { NavLink } from "react-router-dom";
import {
  labelSideBarContent,
  ArtistSideBarContent,
} from "../../utils/routeMaps";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import withAuth from "../../Api/withAuth";

function LabelSidebarLinks({ setSideBarisOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { userRole } = withAuth();
  const [sidebarContent, setSidebarContent] = useState([]);

  const navStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#EF770E" : "transparent",
    color: isActive ? "white" : "#13064E",
    borderRadius: isActive && "20px",
  });

  const handleToggleDropdown = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  useEffect(() => {
    if (userRole === "independent_artist") {
      setSidebarContent(ArtistSideBarContent);
    } else if (userRole === "record_label") {
      setSidebarContent(labelSideBarContent);
    } else {
      setSidebarContent([]);
    }
  }, [userRole]);

  return (
    <>
      <div className="flex flex-col gap-y-1.5">
        {sidebarContent.map((item) => (
          <div key={item.name}>
            {item.dashChildren ? (
              //Dropdown Parent
              <div>
                <NavLink
                  to={item.path}
                  style={navStyle}
                  className="flex gap-x-3 p-2 justify-between items-center"
                >
                  <div className="flex gap-x-3 items-center">
                    <div>
                      <item.icon />
                    </div>
                    <div className="font-medium">{item.name}</div>
                  </div>

                  <div
                    className="px-2"
                    onClick={() => handleToggleDropdown(item.name)}
                  >
                    {openDropdown === item.name ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>
                </NavLink>

                {/* Dropdown children */}

                {openDropdown === item.name && (
                  <div>
                    {item?.dashChildren.map((child) => (
                      <div className="ml-8 mt-1 text-[15px]">
                        <NavLink
                          onClick={() => setSideBarisOpen(false)}
                          to={child.path}
                          style={navStyle}
                        >
                          <div>
                            <div className="flex gap-x-3 p-2 items-center">
                              <div>
                                <child.icon />
                              </div>
                              <div className="font-medium">{child.name}</div>
                            </div>
                          </div>
                        </NavLink>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <NavLink
                  onClick={() => setSideBarisOpen(false)}
                  to={item.path}
                  style={navStyle}
                  className="flex gap-x-3 p-2 items-center"
                >
                  <div>
                    <item.icon />
                  </div>
                  <div className="font-medium">{item.name}</div>
                </NavLink>
              </div>
            )}
          </div>
        ))}

        {/* {sideBarContent.map(item => (
          <SidebarSingleLink
            path={item.path}
            text={item.name}
            icon={item.icon}
            setSideBarisOpen={setSideBarisOpen}
          />
        ))} */}
      </div>
    </>
  );
}

export default LabelSidebarLinks;
