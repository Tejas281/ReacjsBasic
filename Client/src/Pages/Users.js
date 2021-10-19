import React, { useState, useEffect } from "react";
import axios from "axios";
import { batch } from "react-redux";
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
import { setUsers } from "../Store/Users";
import { userAdd } from "../Store/Auth/Actions";
import TablePagination from "@mui/material/TablePagination";
import { countUser } from "../Store/CoustUser/CountUser";
import PopoverPopupState from "../Component/ProfilePicUsers"
import HideImageRoundedIcon from '@mui/icons-material/HideImageRounded';
import { pagination } from "../Store/Users/Pagination";

var DATA = {};
const Users = () => {
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dispatch = useDispatch();
  const [auth, users, UsersValues] = useSelector((state) => [
    state?.auth?.user,
    state?.users?.users || null,
    state?.count?.UsersValues || null,
  ]);

  console.log("aurh user", auth);
  console.log(UsersValues);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!auth) {
      axios
        .get("http://localhost:5000/api/auth", {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          batch(() => {
            dispatch(userAdd(res.data));
          
          });
        });
      // if (!UsersValues) {
      //   axios.get("http://localhost:5000/api/users/usersdata").then((res) => {
      //     dispatch(countUser(res.data));
      //   });
      // }
    }
  }, [auth]);

  useEffect(() => {
    console.log({ DATA });
    if (DATA[page]) {
      setPageInfo(DATA[page].info);
      dispatch(setUsers(DATA[page].users));
      return;
    }
    axios
      .get(
        `http://localhost:5000/api/users/pages?page=${page}&limit=${rowsPerPage}`,
        {
          headers: { Authorization: `${token}` },
        }
      )
      .then((res) => {
        DATA[page] = res.data;
        setPageInfo(res.data.info);
        dispatch(setUsers(res.data.users));
      });
  }, [page, rowsPerPage]);
  const handleSubmit = (userId) => {
    axios
      .delete(`http://localhost:5000/api/users/delete/${userId}`)
      .then((res) => {
        console.log("Data Remove", res.data);
        dispatch(setUsers(users.filter((single) => single._id !== userId)));
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
              {users?.map((user, i) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  height={"10dp"}
                  Padding={"16dp"}
                  key={i}
                >
                  <TableCell component="th" scope="row">
                    {user.firstName}
                  </TableCell>
                  <TableCell><PopoverPopupState usersProfile={user.profilefile}/></TableCell>
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
              ))}
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
