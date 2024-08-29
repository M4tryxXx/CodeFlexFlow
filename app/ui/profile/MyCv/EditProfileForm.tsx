"use client";

import Link from "next/link";
import {
  InformationCircleIcon,
  StopCircleIcon,
  UserIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../../Button";
import { deleteUserSide, editProfileUserSide } from "@/app/lib/client-actions";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirectUser } from "@/app/lib/actions";

export default function EditProfileForm({ user }: any) {
  if (!user) {
    return (
      <div className="flex items-center justify-start">
        <StopCircleIcon className="h-10 w-10 text-red-500" />
        <h1 className="text-2xl text-gray-800 dark:text-gray-200 ml-2">
          User not found
        </h1>
        <Button
          onClick={() => redirectUser("/home/dashboard")}
          className="ml-4"
        >
          Go back
        </Button>
      </div>
    );
  }

  const {
    id,
    email,
    firstName,
    lastName,
    username,
    role,
    mobile,
    avatar,
    address,
    city,
    state,
    country,
    zip,
    address2,
    bio,
    website,
    linkedin,
    twitter,
    facebook,
    instagram,
    github,
    age,
    twitch,
    youtube,
    discord,
    street,
    house,
  } = user;

  const [emailState, setEmailState] = useState(email);
  const [firstNameState, setFirstNameState] = useState(firstName);
  const [lastNameState, setLastNameState] = useState(lastName);
  const [usernameState, setUsernameState] = useState(username);
  const [mobileState, setMobileState] = useState(mobile);
  const [avatarState, setAvatarState] = useState(avatar);
  const [addressState, setAddressState] = useState(address);
  const [cityState, setCityState] = useState(city);
  const [stateState, setStateState] = useState(state);
  const [countryState, setCountryState] = useState(country);
  const [zipState, setZipState] = useState(zip);
  const [address2State, setAddress2State] = useState(address2);
  const [bioState, setBioState] = useState(bio);
  const [websiteState, setWebsiteState] = useState(website);
  const [linkedinState, setLinkedinState] = useState(linkedin);
  const [twitterState, setTwitterState] = useState(twitter);
  const [facebookState, setFacebookState] = useState(facebook);
  const [instagramState, setInstagramState] = useState(instagram);
  const [githubState, setGithubState] = useState(github);
  const [ageState, setAgeState] = useState(age);
  const [youtoubeState, setYoutoubeState] = useState(youtube);
  const [twitchState, settwitchState] = useState(twitch);
  const [discordState, setDiscordState] = useState(discord);
  const [streetState, setStreetState] = useState("");
  const [houseState, setHouseState] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let checkedAge: any;
    if (ageState !== "") {
      checkedAge = parseInt(ageState);
      if (isNaN(checkedAge)) {
        const element = document.getElementById("age") as HTMLElement | null;
        toast.error("Age must be a number");
        if (element) {
          element.style.border = "1px solid red";
          element.style.outlineColor = "red";
          element.focus();
        }
        return;
      }
    }
    const element = document.getElementById("age") as HTMLElement | null;
    if (element) {
      element.style.border = "1px solid #D1D5DB";
      element.style.outlineColor = "#2563EB";
    }
    await editProfileUserSide({
      firstName: firstNameState,
      lastName: lastNameState,
      email: emailState,
      username: usernameState,
      id: id,
      age: checkedAge,
      github: githubState,
      instagram: instagramState,
      facebook: facebookState,
      twitter: twitterState,
      linkedin: linkedinState,
      website: websiteState,
      bio: bioState,
      address2: address2State,
      zip: zipState,
      country: countryState,
      state: stateState,
      city: cityState,
      address: addressState,
      avatar: avatarState,
      mobile: mobileState,
      youtube: youtoubeState,
      twitch: twitchState,
      street: streetState,
      house: houseState,
    });
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    await deleteUserSide(id, "account");
  };
  return (
    <>
      <div className="relative my-5 mx-6 bg-sky-200 rounded-md border">
        <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  peer-focus:text-gray-900 dark:text-sky-300" />
        <div className="rounded-md border border-blue-300 py-2 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
          Verificati cu atentie detaliile!
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          await handleSubmit(e);
        }}
      >
        <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Account Information
          </h3>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white disabled:bg-gray-200 disabled:text-gray-500 cursor-not-allowed"
                value={username}
                readOnly
                disabled
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white disabled:bg-gray-200 disabled:text-gray-500 cursor-not-allowed"
                value={email}
                readOnly
                disabled
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <hr className="w-full border-[3px] border-gray-200 dark:border-emerald-800 rounded-md my-6" />
          <div className="hidden" id="personal-information">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Personal Information
            </h3>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <div className="relative">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={(e) => setFirstNameState(e.target.value)}
                  // onFocus={(e) => (e.target.value = firstNameState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={firstName ? firstName : "Prenumele..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={(e) => setLastNameState(e.target.value)}
                  // onFocus={(e) => (e.target.value = lastNameState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={lastName ? lastName : "Last name..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
                htmlFor="age"
              >
                Age
              </label>{" "}
              <div className="relative">
                <input
                  id="age"
                  type="text"
                  name="age"
                  onChange={(e) => {
                    setAgeState(e.target.value);
                  }}
                  // onFocus={(e) => (e.target.value = age)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={age ? age : "Age..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="bio"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                About you
              </label>
              <div className="relative">
                <textarea
                  id="bio"
                  name="bio"
                  onChange={(e) => setBioState(e.target.value)}
                  // onFocus={(e) => (e.target.value = bio)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={bio ? bio : "About you ..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="avatar"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              <div className="relative">
                <input
                  id="avatar"
                  name="avatar"
                  onChange={(e) => setAvatarState(e.target.value)}
                  // onFocus={(e) => (e.target.value = avatar)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={avatar ? avatar : "Image Link..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Mobile No
              </label>
              <div className="relative">
                <input
                  id="mobile"
                  name="mobile"
                  onChange={(e) => setMobileState(e.target.value)}
                  // onFocus={(e) => (e.target.value = mobileState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={mobile ? mobile : "072..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="street"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Street
              </label>
              <div className="relative">
                <input
                  id="street"
                  name="street"
                  onChange={(e) => setStreetState(e.target.value)}
                  // onFocus={(e) => (e.target.value = addressState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={street ? street : "Street..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="house"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                House no.
              </label>
              <div className="relative">
                <input
                  id="house"
                  name="house"
                  onChange={(e) => setHouseState(e.target.value)}
                  // onFocus={(e) => (e.target.value = addressState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={house ? house : "House no..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Street address
              </label>
              <div className="relative">
                <input
                  id="address"
                  name="address"
                  onChange={(e) => setAddressState(e.target.value)}
                  // onFocus={(e) => (e.target.value = addressState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={address ? address : "Address..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="address2"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Address 2
              </label>
              <div className="relative">
                <input
                  id="address2"
                  name="address2"
                  onChange={(e) => setAddress2State(e.target.value)}
                  // onFocus={(e) => (e.target.value = address2State)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={address2 ? address2 : "Address..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="city"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                City
              </label>
              <div className="relative">
                <input
                  id="city"
                  name="city"
                  onChange={(e) => setCityState(e.target.value)}
                  // onFocus={(e) => (e.target.value = cityState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={city ? city : "City..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="state"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                State
              </label>
              <div className="relative">
                <input
                  id="state"
                  name="state"
                  onChange={(e) => setStateState(e.target.value)}
                  // onFocus={(e) => (e.target.value = stateState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={state ? state : "State..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="country"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <div className="relative">
                <input
                  id="country"
                  name="country"
                  onChange={(e) => setCountryState(e.target.value)}
                  // onFocus={(e) => (e.target.value = countryState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={country ? country : "Country..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="zip"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Post code
              </label>
              <div className="relative">
                <input
                  id="zip"
                  name="zip"
                  onChange={(e) => setZipState(e.target.value)}
                  // onFocus={(e) => (e.target.value = zipState)}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  placeholder={zip ? zip : "Post code..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <hr className="w-full border-[3px] border-gray-200 dark:border-emerald-800 rounded-md my-6" />
          </div>

          <div className="hidden" id="social-information">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Social
            </h3>
            <div className="mb-4">
              <label
                htmlFor="website"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Website
              </label>
              <div className="relative">
                <input
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  id="website"
                  type="text"
                  // onFocus={(e) => (e.target.value = websiteState)}
                  name="website"
                  onChange={async (e) => {
                    setWebsiteState(e.target.value);
                  }}
                  placeholder={website ? website : "Website..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="linkedin"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Linkedin
              </label>
              <div className="relative">
                <input
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  id="linkedin"
                  type="text"
                  // onFocus={(e) => (e.target.value = linkedinState)}
                  name="linkedin"
                  onChange={async (e) => {
                    setLinkedinState(e.target.value);
                  }}
                  placeholder={linkedin ? linkedin : "Linkedin..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="twitter"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                X (Twitter)
              </label>
              <div className="relative">
                <input
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  id="twitter"
                  type="text"
                  // onFocus={(e) => (e.target.value = twitterState)}
                  name="twitter"
                  onChange={async (e) => {
                    setWebsiteState(e.target.value);
                  }}
                  placeholder={twitter ? twitter : "X..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="facebook"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Facebook
              </label>
              <div className="relative">
                <input
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  id="facebook"
                  type="text"
                  // onFocus={(e) => (e.target.value = facebookState)}
                  name="facebook"
                  onChange={async (e) => {
                    setFacebookState(e.target.value);
                  }}
                  placeholder={facebook ? facebook : "Facebook..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="github"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Git Hub
              </label>
              <div className="relative">
                <input
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  id="github"
                  type="text"
                  // onFocus={(e) => (e.target.value = githubState)}
                  name="github"
                  onChange={async (e) => {
                    setGithubState(e.target.value);
                  }}
                  placeholder={github ? github : "Git Hub..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="youtube"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Youtube
              </label>
              <div className="relative">
                <input
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  id="youtube"
                  type="text"
                  // onFocus={(e) => (e.target.value = youtube)}
                  name="youtube"
                  onChange={async (e) => {
                    setYoutoubeState(e.target.value);
                  }}
                  placeholder={youtube ? youtube : "Youtube..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="twitch"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Twitch
              </label>
              <div className="relative">
                <input
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  id="twitch"
                  type="text"
                  // onFocus={(e) => (e.target.value = twitchState)}
                  name="twitch"
                  onChange={async (e) => {
                    settwitchState(e.target.value);
                  }}
                  placeholder={twitch ? twitch : "Twitch..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="discord"
                className="mb-3 mt-5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Discord
              </label>
              <div className="relative">
                <input
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300 placeholder:focus:text-gray-400 dark:bg-stone-700 dark:text-gray-500 dark:peer-focus:text-white dark:placeholder-gray-500 dark:focus:placeholder-gray-400"
                  id="discord"
                  type="text"
                  // onFocus={(e) => (e.target.value = discordState)}
                  name="discord"
                  onChange={async (e) => {
                    setDiscordState(e.target.value);
                  }}
                  placeholder={discord ? discord : "Discord..."}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 peer-focus:text-gray-700 dark:text-gray-500 dark:peer-focus:text-gray-400" />
              </div>
            </div>
            <hr className="w-full border-[3px] border-gray-200 dark:border-emerald-800 rounded-md my-6" />
          </div>
          <div className="flex justify-center flex-row gap-10">
            <div
              className="flex h-9 items-center rounded-lg bg-rose-300 dark:bg-emerald-900 dark:hover:bg-emerald-700 px-4 text-sm font-medium text-black dark:text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-md shadow-black hover:cursor-pointer "
              id="more"
              onClick={() => {
                const element = document.getElementById("personal-information");
                const element2 = document.getElementById("social-more");
                const more = document.getElementById("more");
                if (element && element2) {
                  element.classList.toggle("hidden");
                  element2.classList.toggle("invisible");
                }
                if (more && more.innerHTML === "More") {
                  more.innerHTML = "Less";
                } else if (more) {
                  more.innerHTML = "More";
                }
              }}
            >
              More
            </div>
            <div
              className="flex h-9 items-center rounded-lg bg-rose-300 dark:bg-emerald-900 dark:hover:bg-emerald-700 px-4 text-sm font-medium text-black dark:text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-300 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-md shadow-black hover:cursor-pointer invisible"
              id="social-more"
              onClick={() => {
                const element = document.getElementById("social-information");
                const more = document.getElementById("social-more");
                const element2 = document.getElementById("more");
                if (element && element2) {
                  element2.classList.toggle("hidden");
                  element.classList.toggle("hidden");
                }
                if (more && more.innerHTML === "More") {
                  more.innerHTML = "Less";
                } else if (more) {
                  more.innerHTML = "More";
                }
              }}
            >
              More
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/profile"
              className="flex h-9 items-center rounded-lg bg-rose-500 dark:bg-emerald-900 dark:hover:bg-emerald-700 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 active:bg-rose-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 shadow-md shadow-black"
            >
              Cancel
            </Link>
            <Button type="submit">Salveaza</Button>
          </div>
        </div>
      </form>
      <div className="relative my-5 bg-red-300 rounded-md border">
        <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  peer-focus:text-gray-900 text-black" />
        <div className="rounded-md border border-red-500 py-2 pl-10 text-md  dark:text-black outline-2 font-medium dark:bg-red-300 dark:border-red-400">
          If you delete your account, all your data will be lost.
        </div>
      </div>
      <form
        onSubmit={(e) => {
          handleDelete(e);
        }}
      >
        <input type="text" name="userId" readOnly hidden value={id} />
        <button
          type="submit"
          className="flex h-9 items-center justify-end rounded-lg bg-rose-100 px-3 text-sm font-medium text-gray-800 transition-colors dark:bg-emerald-300 hover:bg-rose-300 dark:hover:bg-rose-300"
        >
          Delete Account
        </button>
      </form>
    </>
  );
}
