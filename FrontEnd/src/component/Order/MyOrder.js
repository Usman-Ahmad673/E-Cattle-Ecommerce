    import React, { Fragment, useEffect } from "react";
    import { DataGrid } from "@material-ui/data-grid";
    import "./myOrders.css";
    import { useSelector, useDispatch } from "react-redux";
    import { clearErrors, myOrders } from "../../actions/orderActions";
    import Loader from "../layout/Loader/Loader";
    import { Link } from "react-router-dom";
    // import { useAlert } from "react-alert";
    import Typography from "@material-ui/core/Typography";
    import MetaData from "../layout/MetaData";
    import LaunchIcon from "@mui/icons-material/Launch";


    

    const MyOrders = () => {
        const dispatch = useDispatch();

        // const alert = useAlert();
        
            const { loading, error, order } = useSelector((state) => state.myOrders);
            const { user } = useSelector((state) => state.user);

            // console.log(order[0].orderItems[0].name);

            console.log(`user details: ${user}`);
        
            const columns = [
            { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        
            {
                field: "itemsQty",
                headerName: "Items Qty",
                type: "number",
                minWidth: 150,
                flex: 0.3,
            },
        
            {
                field: "amount",
                headerName: "Amount",
                type: "number",
                minWidth: 270,
                flex: 0.5,
            },
        
            {
                field: "actions",
                flex: 0.3,
                headerName: "Actions",
                minWidth: 150,
                type: "number",
                sortable: false,
                renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                    <LaunchIcon />
                    </Link>
                );
                },
            },
            ];
            const rows = [];
        // if(user.role === 'admin'){
            order &&
                order.forEach((item, index) => {
                    rows.push({
                    itemsQty: item.orderItems.length,
                    id: item._id,
                    status: item.orderStatus,
                    amount: item.totalPrice,
                    });
            });
        // }
        // else{
            // user.order &&
            //     user.order.forEach((item, index) => {
            //         rows.push({
            //         itemsQty: item.orderItems.length,
            //         id: item._id,
            //         status: item.orderStatus,
            //         amount: item.totalPrice,
            //         });
            // });
        // }
        
            useEffect(() => {
            if (error) {
                alert(error);
                dispatch(clearErrors());
            }
        
            dispatch(myOrders());
        }, [dispatch, error]);
        

    return (
        <Fragment>
        {user && (
            <MetaData title={`${user.name} - Orders`} />
                )}

        {loading ? (
            <Loader />
        ) : (
            <div className="myOrdersPage">
            <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 90,
            },
          },
        }}
        pageSizeOptions={[90]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    {user && (
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
    )}
            </div>
        )}
        </Fragment>
    );
    };

    export default MyOrders;