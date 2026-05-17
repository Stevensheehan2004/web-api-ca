import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieRecommendationsPage from "./pages/movieRecommendationsPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import WatchListPage from "./pages/watchListPage";
import NowPlayingPage from "./pages/nowPlayingMovies";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import ActorsPage from "./pages/actorsPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import StartPage from "./pages/startPage";
import ProfilePage from "./pages/profilePage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthContextProvider>
            <MoviesContextProvider>
              <SiteHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                  <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                  <Route path="/watchlist" element={<WatchListPage />} />
                </Route>
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/movies/:id/recommendations" element={<MovieRecommendationsPage />} />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/nowplaying" element={<NowPlayingPage />} />
                <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
                <Route path="/actors" element={<ActorsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
          </AuthContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);