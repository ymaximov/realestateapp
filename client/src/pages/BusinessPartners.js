import React from "react";
import Layout from "../components/Layout";
import { Table, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import useGet from "../hooks/useGet";
import { useSelector } from "react-redux";

export default function BusinessPartners() {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user).user.companyId._id;
  const { data, isLoading, err } = useGet({
    api: `/api/user/get-all-business-partners/${id}`,
  });
  if (isLoading) return "Loading...";
  if (err) return <h1>{err}</h1>;
  const columns = [
    {
      title: "Company Name",
      dataIndex: "bpCompanyName",
    },
    {
      title: "Partner Type",
      dataIndex: "BPType",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Website",
      dataIndex: "website",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Link to={`/user/bp-profile/${record._id}`} className="anchor">
            Edit
          </Link>
        </div>
      ),
    },
  ];
  console.log(data);
  return (
    <Layout>
      <h1>Business Partners</h1>
      <Button type="primary" onClick={() => navigate("/add-business-partner")}>
        Add
      </Button>
      <Table columns={columns} dataSource={data} />
    </Layout>
  );
}
