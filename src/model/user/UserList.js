import request from "../../util/request";


const delay = (millisecond) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecond);
    });
};
export default {
    namespace: 'user-UserList',
    state: {
        tableData: [],
        total: 100
    },
    effects: {
        * queryInitTable(action, {call, put}) {
            try {
                const endPointURI = '/dev/user';
                const puzzle = yield call(request, endPointURI);
                yield put({type: 'listTable', payload: puzzle});

            } catch (e) {
                console.log(e);
                message.error('数据获取失败'); // 打印错误信息
            }
        }, * changePage(action, {call, put}) {

            try {
                console.log(action);
                const endPointURI = '/dev/user?page=' + (action.payload.current - 1) + '&size=' + action.payload.pageSize;
                const puzzle = yield call(request, endPointURI);
                yield put({type: 'listTable', payload: puzzle});

            } catch (e) {
                console.log(e);
                message.error('数据获取失败'); // 打印错误信息
            }
        }
    },
    reducers: {
        listTable(state, {payload: listData}) {
            return {
                tableData: listData.object.content,
                total: listData.object.totalElements
            };
        }
    }
}