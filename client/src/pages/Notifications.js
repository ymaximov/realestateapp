import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import axios from 'axios'
import toast from "react-hot-toast";
import { setUser } from "../redux/userSlice";

export default function Notifications() {
    const user = useSelector((state)=> state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deleteAll = async()=> {
      try {
        dispatch(showLoading());
        const res = await axios.post('/api/user/delete-all-notifications', {userId: user._id}, {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(hideLoading())
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(setUser(res.data.data))
        } else {
          toast.error(res.data.message)
        }
       } catch (error) {
        dispatch(hideLoading());
        toast.error('Something went wrong')
       }
    }
    const markAllAsSeen = async()=> {
       try {
        dispatch(showLoading());
        const res = await axios.post('/api/user/mark-all-notifications-as-seen', {userId: user._id}, {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(hideLoading())
        console.log(res.data,"-=-=-=-=-=-")
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(setUser(res.data.data))
        } else {
          toast.error(res.data.message)
        }
       } catch (error) {
        dispatch(hideLoading());
        console.log(error)
        toast.error('Something went wrong')
       }
    }
  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <hr />
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={()=> markAllAsSeen()}>Mark all as seen</h1>
          </div>
          {user?.user.unseenNotifications.map((notification, index) =>
          { 
            console.log(notification);
            return (
            <div className="card p-3" key={index} onClick={()=> navigate(notification.onclickPath)}>
                <div className="card-text">{notification.message}</div>
            </div>
          )})}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={()=> deleteAll()}>Delete all notifications</h1>
          </div>
          {user?.user.seenNotifications.map((notification, index) =>
          { 
            console.log(notification);
            return (
            <div className="card p-3" key={index} onClick={()=> navigate(notification.onclickPath)}>
                <div className="card-text">{notification.message}</div>
            </div>
          )})}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}
