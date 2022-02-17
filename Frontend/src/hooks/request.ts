import axios, { AxiosRequestHeaders, Method } from "axios";
import { useState, useEffect } from "react";
import Router from "next/router";

export const sendRequest = (
  // e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  url: string,
  body: any = {}, //default value for body
  method: Method = "GET" // default method get
) => {
  // e.preventDefault();

  let token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root") as any).userReducer
  ).token;
  console.log(token);
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  return axios({ method: method, url: url, data: body, headers: headers })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status == 401) {
          // localStorage.clear();
          //  Router.push("/");
          return error.response;
        }
        return error.response;
      }
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // Something happened in setting up the request that triggered an Error
      else {
        // In our case this is newtwork error
        console.log("Error", error.message);
        console.log(error.request);
        console.log(error.config);
        return error.message;
      }
    });
};
export const sendRequestWithJson = (
  // e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  url: string,
  body: any = {}, //default value for body
  method: Method = "GET" // default method get
) => {
  console.log(body);
  
  // e.preventDefault();
  let token = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root") as any).userReducer
  ).token;
  console.log(token);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return axios({ method: method, url: url, data: body, headers: headers })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.status);
        // console.log(error.response.data);
        // console.log(error.response.headers);
        if (error.response.status == 401) {
          // localStorage.clear();
          //  Router.push("/");
          return error.response;
        }
        return error.response;
      }
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // Something happened in setting up the request that triggered an Error
      else {
        // In our case this is newtwork error
        console.log("Error", error.message);
        console.log(error.request);
        console.log(error.config);
        return error.message;
      }
    });
};
export const sendRequestWithoutAuth = (
  // e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  url: string,
  body: any = {}, //default value for body
  method: Method = "GET" // default method get
) => {
  // e.preventDefault();
  return axios({ method: method, url: url, data: body })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.status);
        console.log(error.response.data);
        console.log(error.response.headers);
        if (error.response.status == 401) {
          // localStorage.clear();
          //  Router.push("/");
          return error.response;
        }
        return error.response;
      }
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // Something happened in setting up the request that triggered an Error
      else {
        // In our case this is newtwork error
        console.log("Error", error.message);
        console.log(error.request);
        console.log(error.config);
        return error.message;
      }
    });
};
