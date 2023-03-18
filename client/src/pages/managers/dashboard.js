import { faLaptopFile, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, List, Row } from "antd";
import { Link } from "react-router-dom";
import { icon } from "~/assets/images";
import "~/assets/style/Admin/Dashboard.scss"
const data = [
    {
        icon: faUsers,
        title: "Khách hàng",
        color: `var(--cyan)`,
        link: "customer"
    },
    {
        icon: faLaptopFile,
        title: "Vụ việc",
        color: `var(--volcano)`,
        link: "matter"
    },
    {
        icon: faUser,
        title: "Kế toán",
        color: `var(--green)`
    },
    {
        icon: faUser,
        title: "Lịch làm việc",
        color: `var(--gold)`
    },
    {
        icon: faUser,
        title: "Báo giá",
        color: `var(--magenta)`
    },
    {
        icon: faUser,
        title: "Nhân viên",
        color: `var(--oranger)`
    }
    
];
function Dashboard() {
    return (
        <>
        <div className="dashboard">
            <List
                
                style={{ width: '50%' }}
                grid={{
                    column: 4,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        style={{textAlign:'center'}}>
                            <Link to={`${item.link}`}>
                            <Avatar
                            className="item-dashboard"
                            shape="square"
                            style={{
                                backgroundColor: item.color,
                                verticalAlign: 'middle',
                            }}
                            icon={<FontAwesomeIcon icon={item.icon}/>}
                            size={100}
                        />
                        <h4>{item.title}</h4>
                            </Link>
                        
                        
                    </List.Item>
                )}
            /> 
        </div>
           
        </>
    );
}

export default Dashboard;