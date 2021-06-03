import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Footer: "Id",
  },
  {
    Header: "First Name",
    accessor: "first_name",
    Footer: "First Name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
    Footer: "Last Name",
  },
  {
    Header: "Date of Birth",
    accessor: "date_of_birth",
    Footer: "Date of Birth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Country",
    accessor: "country",
    Footer: "Country",
  },
  {
    Header: "Phone",
    accessor: "phone",
    Footer: "Phone",
  },
  {
    Header: "Email",
    accessor: "email",
    Footer: "Email",
  },
  {
    Header: "Age",
    accessor: "age",
    Footer: "Age",
  },
];

//data load using api
// export const COLUMNS = [
//   {
//     Header: "Id",
//     accessor: "_id",
//   },
//   {
//     Header: "Username",
//     accessor: "username",
//   },
//   {
//     Header: "Email",
//     accessor: "email",
//   },
//   {
//     Header: "Created_At",
//     accessor: " created_at",
//   },
//   {
//     Header: "Password",
//     accessor: "password",
//   },
//   {
//     Header: "Role",
//     accessor: "role",
//   },
// ];
