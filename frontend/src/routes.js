import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import NotFoundView from 'src/views/errors/NotFoundView';

import HomeView from 'src/views/home/HomeView';
import ConcertListView from 'src/views/concert/ConcertListView';
import ConcertDetailsView from 'src/views/concert/ConcertDetailsView';
import SongListView from 'src/views/song/SongListView';
import SongDetailsView from 'src/views/song/SongDetailsView';
import MemberListView from 'src/views/member/MemberListView';
import MemberDetailsView from 'src/views/member/MemberDetailsView';
import RecordListView from 'src/views/record/RecordListView';
import RecordDetailsView from 'src/views/record/RecordDetailsView';
import ContactView from 'src/views/contact/ContactView';
import BookingView from 'src/views/contact/BookingView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'home', element: <HomeView /> },
      { path: 'concerts', element: <ConcertListView /> },
      { path: 'concerts/:concertId', element: <ConcertDetailsView /> },
      { path: 'songs', element: <SongListView /> },
      { path: 'songs/:songId', element: <SongDetailsView /> },
      { path: 'members', element: <MemberListView /> },
      { path: 'members/:memberId', element: <MemberDetailsView /> },
      { path: 'records', element: <RecordListView /> },
      { path: 'records/:recordId', element: <RecordDetailsView /> },
      { path: 'contact', element: <ContactView /> },
      { path: 'booking', element: <BookingView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/home" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
