import React, { useState, useEffect } from "react";
import { Card, Loader, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-weight-bold text-primary h4 text-uppercase">
      {title}
    </h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResult, setSearchedResult] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResult(searchResult);
      }, 500)
    );
  };
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://imagify-im2o.onrender.com/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  return (
    <section>
      <div className="pricing-header px-3 py-3 pt-md-3 pb-md-4 mr-auto">
        <div>
          <h1 className="display-4" style = {{fontSize:"50px"}}>Image Fiesta</h1>
          <p className="lead">
            Explore a gallery of awe-inspiring and artistically crafted images
            brought to life by <snap className="text-primary">Imagify...</snap>
          </p>
        </div>
        <div className="mt-5">
          <FormField
            labelName="Search posts"
            type="text"
            name="text"
            placeholder="Search something..."
            value={searchText}
            handleChange={handleSearchChange}
          />
        </div>
        <div className="mt-5">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-weight-bold text-muted h4 mb-3">
                  showing result for{" "}
                  <span className="text-[#222328]">
                    {"'" + searchText + "'"}
                  </span>
                </h2>
              )}
              {/* <div className="container"> */}
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
                {searchText ? (
                  <RenderCards data={searchedResult} title="Nothing found!" />
                ) : (
                  <RenderCards data={allPosts} title="No posts found" />
                )}
              </div>
              {/* </div> */}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;