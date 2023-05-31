import React from 'react'
import Layout from '../components/Layout'
import {Col, Row, Tabs, Form, Input, Button, Table} from 'antd'
import useGet from '../hooks/useGet'
import { useNavigate, Link, useParams  } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function TeamManagement() {
const navigate = useNavigate()
const id = useSelector((state) => state.user).user.companyId._id;
    const {data, isLoading, err} = useGet({ api: `/api/admin/get-all-users/${id}` })
    console.log(data)
    if(isLoading) return "Loading..."
    if(err) return <h1>{err}</h1>
    const columns = [
        {
          title: "Username",
          dataIndex: "email",
        },
        {
          title: "Name",
          dataIndex: "name",
          render: (text, record) => record.firstName + ' ' +record.lastName
        },
        {
          title: "Phone Number",
          dataIndex: "phone",
        },
        {
          title: "Account Type",
          dataIndex: "role",
        },
        {
          title: "Actions",
          dataIndex: "actions",
          render: (text, record) => (
            <div className="d-flex">
              <Link to={`/admin/user-profile/${record._id}`} className="anchor">Edit</Link>
            </div>
          ),
        },
      ];
  return (
    <Layout>
        <h1>Employee Management</h1>
        <hr />
        <Button type="primary" onClick={() => navigate(`admin/create-user/${id}`)}>
        Add
      </Button>
        <Table columns={columns} dataSource={data.data} />
    </Layout>
  )
}
