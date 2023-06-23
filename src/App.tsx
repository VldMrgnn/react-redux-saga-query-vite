import { useState } from "react";
import reactLogo from "./assets/react.svg";
import sagaLogo from "./assets/Redux-Saga-Logo.png";
import viteLogo from "/vite.svg";
import { useAppDispatch, useAppSelector } from "@app/state";
import { selectCounter, counterOp } from "@app/state";
import { removePosts, loadPosts, postList } from "@app/state";

import type { TPost } from "@app/types";

import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(0);
  const [postsToFetch, setPostsToFetch] = useState(1);

  const counter = useAppSelector(selectCounter);
  const posts:TPost[] = useAppSelector(postList) ;
  return (
    <div id={"containerMain"}>
      <div id={"containerHeader"}>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="https://github.com/redux-saga/saga-query" target="_blank">
            <img src={sagaLogo} className="logo saga" alt="Redux Saga logo" />
          </a>
        </div>
        <h1>Vite + React + Redux-Saga</h1>
        <h2>with saga-query</h2>
        <p className="read-the-docs">
          Click on the Vite, React or Redux-Saga logos to learn more
        </p>
      </div>
      <div id="local-pane">
        <div className="card">
          <h2>Local State</h2>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
      <div id="thunk-pane">
        <div className="card">
          <h2>Redux Saga</h2>
          <h3>saga-query / thunk</h3>
          <p>{`Store counter is ${counter}`}</p>
          <button
            onClick={() => dispatch(counterOp({ type: "set", payload: 42 }))}
          >
            set 42
          </button>
          <button onClick={() => dispatch(counterOp({ type: "decrement" }))}>
            decrement
          </button>
          <button onClick={() => dispatch(counterOp({ type: "increment" }))}>
            increment
          </button>
          <button onClick={() => dispatch(counterOp({ type: "reset" }))}>
            reset
          </button>
        </div>
      </div>
      <div id="api-pane">
        <div className="card">
          <h2>Redux Saga</h2>
          <h3>saga-query / api</h3>
          <button
            onClick={() =>
              setPostsToFetch((postsToFetch) => {
                if (postsToFetch === 1) return 1;
                return postsToFetch - 1;
              })
            }
            disabled={postsToFetch === 1}
          >
            -
          </button>
          <button onClick={() => dispatch(loadPosts({ id: postsToFetch }))}>
            Fetch post id:{postsToFetch}
          </button>
          <button
            onClick={() =>
              setPostsToFetch((postsToFetch) => {
                if (postsToFetch === 10) return 10;
                return postsToFetch + 1;
              })
            }
            disabled={postsToFetch === 10}
          >
            +
          </button>

          <button onClick={() => dispatch(removePosts())}>
            Remove all posts
          </button>
          {posts.map((post) => ({ ...post, id: post.id.toString() })).map((post) => {
            return (
              <div key={post.id} style={{textAlign:"left"}}>
                <h4>{post.title}{'  [#'}{post.id}{']'}</h4>
                <p>{post.body}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div id="containerFooter">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
