import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";
import { getUser, setUsers } from "../Store/Users/UsersAction";
import { getAuthuser, userAdd } from "../Store/Auth/Actions";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from '@mui/icons-material/Add';

import PopoverPopupState from "../Component/ProfilePicUsers";

const getPaginated = (array, { page, limit }) => {
  let start = page * limit;
  let end = start + limit;
  return array.slice(start, end);
};
var DATA = {};

const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const usercounts = useSelector(state => state?.users?.pageInfo?.count || null);
  const [auth, users = {}, pageInfo= {count : usercounts}] = useSelector((state) => [
    state?.auth?.user,
    state?.users?.users || null,
  ]);

  console.log("aurh user", auth);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!auth) {
      dispatch(getAuthuser());
    }
  }, [auth]);

  useEffect(() => {
    console.log({ DATA });
    if (!getPaginated(users || [], { page, limit: rowsPerPage }).length) {
      dispatch(getUser({ page, rowsPerPage }));
    }
  }, [page, rowsPerPage]);
  const handleSubmit = (userId) => {
      
    axios
      .delete(`http://localhost:5000/api/users/delete/${userId}`)
      .then((res) => {
        let newUsers = users.filter((single) => single._id !== userId);
        let deletedCount = users.length - newUsers.length;
        dispatch(setUsers(newUsers, deletedCount));
      })
      .catch((err) => {
        console.log("user Not Found", err);
      });
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  console.log({ auth });

  return (
    <>
      <div
        style={{
          justifyContent: "space-evenly",
          display: "grid",
          alignTtems: "center",
          justifyItems: "center",
        }}
      >
        <TableContainer component={Paper} sx={{ minWidth: 500 }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Profile Pic</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                getPaginated(users, { page, limit: rowsPerPage })?.map(
                  (user, i) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      height={"10dp"}
                      Padding={"16dp"}
                      key={i}
                    >
                      <TableCell component="th" scope="row">
                        {user.firstName}
                      </TableCell>
                      <TableCell>
                        <PopoverPopupState usersProfile={user.profilefile} />
                      </TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.gender}</TableCell>

                      <TableCell>
                        <div>
                          <Link
                            to={`/update/${user?._id}`}
                            className="col-sm d-flex btn"
                            key={i}
                            underline="hover"
                          >
                            {"Update"}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        {" "}
                        {auth?._id !== user?._id && (
                          <Button
                            variant="contained"
                            onClick={() => handleSubmit(user._id)}
                            disabled={users.token}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
            
          </Table>
         
          <TablePagination
            component="div"
            count={pageInfo.count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}            
          />
          
          
      
        </TableContainer>
      </div>
    </>
  );
};

export default Users;
