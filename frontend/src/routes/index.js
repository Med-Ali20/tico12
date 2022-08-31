import React from 'react'
import Homepage from '../components/homepage'
import ChildUniversity from '../components/child-university'
import Services from '../components/services'
import Topic from '../components/topic'
import Questions from '../components/questions'
import Register from '../components/register'
import Admin from '../components/register/admin'
import Dashboard from '../components/dashboard'
import AddTopic from '../components/dashboard/addTopic'
import JobApplication from '../components/job-application'
import PageOne from '../components/homepage/pageOne'
import PageTwo from '../components/homepage/pageTwo'
import PageThree from '../components/homepage/pageThree'
import PageFour from '../components/homepage/pageFour'
import {  Routes, Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'


const AppRoutes = ( { token } ) => {
  return (
    <Routes>
    <Route path="/child-university" element={<ChildUniversity />} />
    <Route path="/services" element={<Services />} />
    <Route path="/topic/:id" element={<Topic />} />
    <Route path="/questions" element={<Questions />} />
    <Route path="/register/:title" element={<Register />} />
    <Route path="/admin/sign-in" element={<Admin />} />
    <Route path="/jobApplication" element={<JobApplication />} />
    <Route path="/dashboard" element={ !token ?  <Navigate to="/" ></Navigate> :<Dashboard />} />
    <Route path="/addTopic" element={!token ?  <Navigate to="/" ></Navigate> :<AddTopic />} />
    <Route path="/" element={<Homepage />} >
      <Route path="pageOne" element={<PageOne />} />
      <Route path="pageTwo" element={<PageTwo />} />
      <Route path="pageThree" element={<PageThree />} />
      <Route path="pageFour" element={<PageFour />} />
    </Route>
    <Route path="*" element={<Navigate to="/" ></Navigate>} />

  </Routes>
  )
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(AppRoutes)