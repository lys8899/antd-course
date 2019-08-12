import {Table} from 'antd';
import {connect} from 'dva';


const namespace = 'user-UserList';

const mapStateToProps = (state) => {
    const userListData = state[namespace].tableData;
    const total = state[namespace].total;
    return {
        userListData, total
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        queryInitTable: () => {
            dispatch({
                type: `${namespace}/queryInitTable`,
            });
        },
        changePage: (page) => {
            dispatch({
                type: `${namespace}/changePage`,
                payload: page
            });
        },

    };
};

@connect(mapStateToProps, mapDispatchToProps)
class UserList extends React.Component {
    componentDidMount() {
        this.props.queryInitTable();
    }

    columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: '账号',
            dataIndex: 'account',
        },
        {
            title: '锁定',
            dataIndex: 'locked',
        },
    ];


    render() {
        return (

            <Table rowKey="id"
                   columns={this.columns}
                   dataSource={this.props.userListData}
                   onChange={page => this.props.changePage(page)}
                   pagination={{
                       showQuickJumper: true,
                       total: this.props.total,
                       showSizeChanger: true,
                       showTotal: total => `共 ${this.props.total} 条`,
                       pageSizeOptions: ['10', '15', '30', '50'],
                   }}
            />
        );
    }
}

export default UserList;