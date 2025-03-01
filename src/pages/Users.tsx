import { useState, useEffect } from "react";
import { useGetUsersQuery } from "../redux/api/userApi";
import { FaTh, FaList } from "react-icons/fa";
import { Pagination, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setUsers } from "../redux/slices/userSlice";
import UsersSkeleton from "../components/Skeleton/UsersSkeleton";
import UserCard from "../components/UserCard/UserCard";
import UserList from "../components/UserList/UserList";
import UserModal from "../components/Modals/UsersModal";
import Navbar from "../components/Navbar/Navbar";

const Users = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useGetUsersQuery({ page });
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (data?.data) {
      dispatch(setUsers(data?.data));
    }
  }, [data]);

  if (isLoading) return <UsersSkeleton />;
  if (isError) return <p>Error fetching users.</p>;

  const totalPages = data?.total_pages || 1;

  const filteredUsers = users?.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar search={search} setSearch={setSearch} />

      <div className="w-full px-4 md:px-8 py-4 md:pt-12">
        <div className="bg-white shadow-lg rounded-lg p-5 min-h-[600px] w-full space-y-4">

          {/* Toggle */}
          <ToggleButtonGroup value={view} exclusive onChange={(_, value) => setView(value)} aria-label="View Selection">
            <ToggleButton value="list">
              <FaList className="mr-1" />
              Table
            </ToggleButton>
            <ToggleButton value="card">
              <FaTh className="mr-1" />
              Card
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Users List/Card View Component */}
          {filteredUsers.length > 0 ? (view === "list" ? <UserList filteredUsers={filteredUsers} /> : <UserCard filteredUsers={filteredUsers} />) : <p>No users found.</p>}
        </div>
      </div>

      {/* Pagination */}
      <div className="w-full flex justify-end px-4 md:px-8 py-4">
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          shape="rounded"
          size="medium"
        />
      </div>
      <UserModal />
    </div>
  );
};

export default Users;
