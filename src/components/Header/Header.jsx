import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  alpha,
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  styled,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { authActions, UIactions } from "../../store";
import axios from "axios";
import {
  AccountCircle,
  ArrowBack,
  ArrowOutward,
  Close,
  DarkModeRounded,
  LightMode,
  MenuOutlined,
} from "@mui/icons-material";
import axiosInstance from "../../services/axiosInstance";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  backgroundColor: "transparent",
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const initial_suggestionsList = [
  { title: "Hello", wasSearched: true },
  { title: "World", wasSearched: true },
  { title: "Top Music Songs", wasSearched: false, wasTrending: true },
  { title: "Trending news", wasSearched: false, wasTrending: true },
];
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const darkMode = useSelector((state) => state.UI.darkMode);
  const open = useSelector((state) => state.UI.sidebarOpen);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const textFieldRef = useRef(null);
  const suggestionsListRef = useRef(null);
  const [seachHistory, setSearhHistory] = useState([]);
  const [seachHistorySuggestions, setSearchHistorySuggestions] = useState([]);
  // const [f1, setF1] = useState(false);

  const [value, setValue] = useState(null);
  const [suggestionsList, setSuggestionList] = useState(initial_suggestionsList);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    dispatch(UIactions.setSelectedMenu({ selectedMenu: undefined }));
    navigate("/profile");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    await axios.post(`${BASE_URL}/users/logout`, {}, { withCredentials: true });
    window.location.reload();
  };

  const handleDarkModeToggle = () => {
    dispatch(UIactions.toggleDarkMode());
  };

  const handleAddOption = (inputValue) => {
    const newOption = { title: inputValue };
    setOptions((prevOptions) => [...prevOptions, newOption]);
    setValue(newOption);
  };
  const handleSubmit = async (e, query) => {
    e.preventDefault();
    if (e.currentTarget.reset) {
      e.currentTarget.reset();
    }
    setIsEditing(false);
    //add query
    if (query) {
      setSearhHistory((prevSuggestions) => [
        { title: query, wasSearched: true },
        ...prevSuggestions.filter((sug) => sug.title !== searchQuery), // Remove duplicates
      ]);
    } else if (searchQuery) {
      const queryExists = suggestionsList.some((sug) => sug.title === query);
      if (!queryExists) {
        setSearhHistory((prevSuggestions) => [
          { title: searchQuery, wasSearched: true },
          ...prevSuggestions.filter((sug) => sug.title !== searchQuery), // Remove duplicates
        ]);
      }
    }
    const res = await axiosInstance.get("/videos", {
      params: {
        search: query ? query : searchQuery,
      },
    });

    let videos = res.data.videos;
    videos = videos.map((video) => ({
      id: video._id,
      thumbnail: video.thumbnail,
      title: video.title,
      views: video.views,
      url: video.videoFile,
      description: video.description,
      channel: video.owner?.username || "Sangya",
      channelID: video.owner?._id || "undefined",
      channelImage: video.owner?.avatar || "./src/assets/channel_icon.png",
      uploadTime: video.createdAt,
    }));
    dispatch(UIactions.setSearchResultVideos({ searchResultVideos: videos }));
    dispatch(UIactions.setDisplaySearch({ displaySearch: "hidden" }));
    navigate("/search");
  };
  // console.log(isEditing);
  const handleClickOutside = (event) => {
    // Check if the click was outside the TextField and suggestions list
    if (
      textFieldRef.current &&
      !textFieldRef.current.contains(event.target) &&
      suggestionsListRef.current &&
      !suggestionsListRef.current.contains(event.target)
    ) {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGetSuggestions = async () => {
    const res = await axiosInstance.get(`/videos/suggestions`, {
      params: {
        searchQuery,
      },
    });
    let titles = res.data.titles;

    // Map titles to the desired format
    titles = titles.map((t) => ({ title: t, wasSearched: false }));

    if (searchQuery !== "") {
      console.log("sdsd");

      const matchingTitles = seachHistory.filter((s) => s.title.startsWith(searchQuery));
      setSearchHistorySuggestions(matchingTitles);
    } else {
      setSearchHistorySuggestions(seachHistory);
    }
    setSuggestionList((prev) => [...titles]);
  };
  console.log(seachHistory);
  useEffect(() => {
    handleGetSuggestions();
  }, [searchQuery]);
  return (
    <>
      <div className="sticky top-0 flex z-40 gap-4 items-center  justify-between p-4 bg-blue-600 dark:bg-zinc-900  text-white shadow-md">
        {/* Left div */}
        <div className="flex">
          <span
            onClick={() => dispatch(UIactions.changeSideBarOpen(!open))}
            className="sm:hidden text-white"
          >
            <MenuOutlined className="mr-2" />
          </span>
          <h1
            onClick={() => navigate("/")}
            className="text-xl hover:cursor-pointer font-bold dark:text-blue-700"
          >
            SANGYA
          </h1>
        </div>

        {/* Center search div */}
        <div className="hidden sm:flex  w-full max-w-2xl relative ">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              e.currentTarget.reset();
            }}
            className="w-full "
          >
            <TextField
              ref={textFieldRef}
              className="rounded-full"
              sx={{
                bgcolor: darkMode ? "rgb(16 16 18)" : "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9999px",
                },
              }}
              onClick={() => {
                setIsEditing(true);
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              variant="outlined"
              placeholder="Search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {searchQuery !== "" ? (
                      <IconButton onClick={() => setSearchQuery("")}>
                        <Close />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "9999px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "9999px",
                  },
                },
              }}
            ></TextField>
          </form>
          {isEditing && (
            <ul
              ref={suggestionsListRef}
              className={`absolute top-16 right-0 left-0 dark:bg-zinc-800  bg-gray-100 rounded-lg`}
            >
              {/* search history suggestions */}
              {seachHistorySuggestions.map((sug, idx) => (
                <li
                  key={idx}
                  className="flex w-full justify-between text-black hover:bg-gray-200 dark:hover:bg-zinc-700 dark:text-white p-2 my-2"
                >
                  <div
                    onClick={(e) => {
                      setSearchQuery(sug.title);
                      handleSubmit(e, sug.title);
                    }}
                    className="w-5/6 overflow-hidden line-clamp-6 hover:cursor-pointer"
                  >
                    {sug.title}
                  </div>
                  {sug.wasSearched && (
                    <button
                      type="submit"
                      className="text-blue-600  dark:text-white "
                      onClick={() => {
                        setSearhHistory(
                          seachHistory.filter((sugggestion) => sugggestion.title !== sug.title)
                        );
                        setSearchHistorySuggestions(
                          seachHistorySuggestions.filter(
                            (sugggestion) => sugggestion.title !== sug.title
                          )
                        );
                      }}
                    >
                      <Close />
                    </button>
                  )}
                </li>
              ))}
              {/* normal suggestiosn query */}
              {suggestionsList.map((sug, idx) => (
                <li
                  key={idx}
                  className="flex w-full justify-between text-black hover:bg-gray-200 dark:hover:bg-zinc-700 dark:text-white p-2 my-2"
                >
                  <div
                    onClick={(e) => {
                      setSearchQuery(sug.title);
                      handleSubmit(e, sug.title);
                    }}
                    className="w-5/6 overflow-hidden line-clamp-6 hover:cursor-pointer"
                  >
                    {sug.title}
                  </div>

                  {/* {sug.wasTrending && <ArrowOutward />} */}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right div */}
        <nav className="flex gap-4 items-center justify-center">
          <span className="sm:hidden">
            <IconButton
              onClick={() => dispatch(UIactions.setDisplaySearch({ displaySearch: "absolute" }))}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
              </Search>
            </IconButton>
          </span>
          <span className="hidden sm:block">
            <IconButton onClick={handleDarkModeToggle}>
              {!darkMode ? (
                <DarkModeRounded sx={{ color: "black" }} />
              ) : (
                <LightMode sx={{ color: "white" }} />
              )}
            </IconButton>
          </span>
          {!auth ? (
            <Button onClick={() => navigate("/login")} color="inherit" variant="outlined">
              Sign In
            </Button>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
