import "../../styles/project.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faArrowUpShortWide, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import Sidebar from "../sideBarseif/SideBarSeif";
// import Header from "./header";

function Manager() {
  return (
    <Sidebar />
    // <div className="manager-container">
    //   <Sidebar />
    //   {/* Content */}
    //   <div className="content-container">
    //     <Header />
    //     {/* Projects */}
    //     <div className="projects-header">
    //       <div className="projects-header-title">
    //         <div className="projects-title">Projects</div>
    //         <div className="projects-buttons">
    //           <button className="projects-filter-button"><FontAwesomeIcon icon={faArrowUpShortWide} /><span className="buttom-text">Filter</span></button>
    //           <button className="projects-add-button"><FontAwesomeIcon icon={faCirclePlus} /><span className="buttom-text">Add Project</span>  </button>
    //         </div>
    //       </div>
    //       <p className="projects-subtitle">
    //         Showing 5 out of 10 projects in total
    //       </p>
    //     </div>


    //     <section className="projects-section">
    //       <div className="card">
    //         <div className="card-sidebar">
    //           <FontAwesomeIcon icon={faEllipsisVertical} />
    //         </div>
    //         <div className="card-content">
    //           <table className="card-table">
    //             <thead>
    //               <tr>
    //                 <th>Column 1</th>
    //                 <th>Column 2</th>
    //                 <th>Column 3</th>
    //                 <th>Column 4</th>
    //                 <th>Column 5</th>
    //                 <th>Column 6</th>
    //                 <th>Column 7</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               <tr>
    //                 <td>Value 1</td>
    //                 <td>Value 2</td>
    //                 <td>Value 3</td>
    //                 <td>Value 4</td>
    //                 <td>Value 5</td>
    //                 <td>Value 6</td>
    //                 <td>Value 7</td>
    //               </tr>
    //             </tbody>
    //           </table>

    //           <div className="card-description">
    //             <div className="description">Description</div>
    //             <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id lacinia nunc. Nulla et eros eget odio tincidunt maximus. Sed convallis elementum risus, eu pellentesque arcu molestie ut.</div>
    //           </div>
    //         </div>
    //       </div>


    //     </section>
    //   </div>
    // </div>
  );
}

export default Manager;





