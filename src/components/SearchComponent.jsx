import { ArrowBack, Close, Search } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UIactions } from "../store";
const initial_suggestionsList = [
  { title: "Hello", wasSearched: true },
  { title: "World", wasSearched: true },
  { title: "Top Music Songs", wasSearched: false },
  { title: "Trending news", wasSearched: false },
];
const SearchComponent = ({}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { displaySearch } = useSelector((state) => state.UI);
  // console.log(displaySearch);
  const [suggestionsList, setSuggestionList] = useState(initial_suggestionsList);

  const [seachHistory, setSearhHistory] = useState([]);
  const [seachHistorySuggestions, setSearchHistorySuggestions] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = async (e, query) => {
    if (e) {
      e.preventDefault();
    }
    if (e.currentTarget.reset) {
      e.currentTarget.reset();
    }
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
      // console.log("sdsd");

      const matchingTitles = seachHistory.filter((s) => s.title.startsWith(searchQuery));
      setSearchHistorySuggestions(matchingTitles);
    } else {
      setSearchHistorySuggestions(seachHistory);
    }
    setSuggestionList((prev) => [...titles]);
  };
  // console.log(seachHistory);
  useEffect(() => {
    handleGetSuggestions();
  }, [searchQuery]);
  return (
    <div
      className={`${displaySearch} sm:mx-auto sm:w-4/5 left-0 right-0 bottom-0 top-0  h-screen-safe w-full z-50 dark:bg-zinc-700 bg-white`}
    >
      {/* serach bar */}
      <form
        onSubmit={handleSearch}
        className="w-full flex  justify-between items-center gap-x-1 dark:bg-zinc-800 bg-gray-200 p-4"
      >
        <IconButton
          className="w-fit"
          onClick={() => dispatch(UIactions.setDisplaySearch({ displaySearch: "hidden" }))}
        >
          <ArrowBack className="min-w-fit" />
        </IconButton>
        <TextField
          // defaultValue={searchQuery}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          className="flex-grow"
          variant="outlined"
          placeholder="Search..."
          InputProps={{
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
              borderRadius: "9999px", // Make the input fully rounded
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "9999px", // Customize the notched outline (make it fully rounded)
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "9999px", // Round the outer container
            },
          }}
        />
        <IconButton onClick={handleSearch} className="w-fit">
          <Search />
        </IconButton>
      </form>
      {/* suggestion list */}
      <div>
        <ul>
          {/* search history suggestions */}
          {seachHistorySuggestions.map((sug, idx) => (
            <li
              key={idx}
              className="flex w-full justify-between text-black hover:bg-gray-200 dark:hover:bg-zinc-700 dark:text-white p-2 my-2"
            >
              <div
                onClick={(e) => {
                  setSearchQuery(sug.title);
                  handleSearch(e, sug.title);
                }}
                className="w-5/6 overflow-hidden line-clamp-6 hover:cursor-pointer"
              >
                {sug.title}
              </div>
              {sug.wasSearched && (
                <button
                  type="button"
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
          {/* normal query suggestions */}
          {suggestionsList.map((sug, idx) => (
            <li
              key={idx}
              className="flex w-full justify-between hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-white p-2 my-2"
            >
              <div
                onClick={(e) => {
                  setSearchQuery(sug.title);
                  handleSearch(e, sug.title);
                }}
                className="w-5/6 overflow-hidden line-clamp-6 hover:cursor-pointer"
              >
                {sug.title}
              </div>

              {sug.wasSearched && (
                <button
                  className="text-blue-600  dark:text-white "
                  onClick={() =>
                    setSuggestionList(
                      suggestionsList.filter((sugggestion) => sugggestion.title !== sug.title)
                    )
                  }
                >
                  <Close />
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default SearchComponent;
