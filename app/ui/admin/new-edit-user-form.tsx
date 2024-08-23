"use client";
import Link from "next/link";
import {
  InformationCircleIcon,
  StopCircleIcon,
  UserIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";
import { Button } from "../Button";
import { editUserSide } from "@/app/lib/client-actions";
import { useState } from "react";

export default function EditUserFormNew({ user }: any) {
  const {
    email,
    firstName,
    lastName,
    username,
    password,
    role,
    resetToken,
    resetTokenExpiry,
    verified,
    verifiedAt,
    verifiyToken,
    verifiyTokenExpiry,
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
    dateOfBirth,
  } = user;

  const [emailState, setEmailState] = useState(email);
  const [firstNameState, setFirstNameState] = useState(firstName);
  const [lastNameState, setLastNameState] = useState(lastName);
  const [usernameState, setUsernameState] = useState(username);
  const [passwordState, setPasswordState] = useState(password);
  const [roleState, setRoleState] = useState(role);
  const [resetTokenState, setResetTokenState] = useState(resetToken);
  const [resetTokenExpiryState, setResetTokenExpiryState] =
    useState(resetTokenExpiry);
  const [verifiedState, setVerifiedState] = useState(verified);
  const [verifiedAtState, setVerifiedAtState] = useState(verifiedAt);
  const [verifiyTokenState, setVerifiyTokenState] = useState(verifiyToken);
  const [verifiyTokenExpiryState, setVerifiyTokenExpiryState] =
    useState(verifiyTokenExpiry);
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
  const [dateOfBirthState, setDateOfBirthState] = useState(dateOfBirth);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await editUserSide({
      email: emailState,
      firstName: firstNameState,
      lastName: lastNameState,
      username: usernameState,
      password: passwordState,
      role: roleState,
      resetToken: resetTokenState,
      resetTokenExpiry: resetTokenExpiryState,
      verified: verifiedState,
      verifiedAt: verifiedAtState,
      verifiyToken: verifiyTokenState,
      verifiyTokenExpiry: verifiyTokenExpiryState,
      mobile: mobileState,
      avatar: avatarState,
      address: addressState,
      city: cityState,
      state: stateState,
      country: countryState,
      zip: zipState,
      address2: address2State,
      bio: bioState,
      website: websiteState,
      linkedin: linkedinState,
      twitter: twitterState,
      facebook: facebookState,
      instagram: instagramState,
      github: githubState,
      dateOfBirth: dateOfBirthState,
      id: user.id,
    });
  };

  return (
    <>
      <div className="relative my-5 bg-sky-200 rounded-md border">
        <InformationCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  peer-focus:text-gray-900 dark:text-sky-300" />
        <div className="rounded-md border border-blue-300 py-2 pl-10 text-sm outline-2 font-medium dark:bg-blue-950 dark:border-sky-500">
          Verificati cu atentie detaliile!
        </div>
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="email"
                value={emailState}
                onChange={(e) => setEmailState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="text"
                value={firstNameState}
                onChange={(e) => setFirstNameState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="First Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="text"
                value={lastNameState}
                onChange={(e) => setLastNameState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="text"
                value={usernameState}
                onChange={(e) => setUsernameState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="password"
                value={passwordState}
                onChange={(e) => setPasswordState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="text"
                value={roleState}
                onChange={(e) => setRoleState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Role"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="text"
                value={resetTokenState}
                onChange={(e) => setResetTokenState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Reset Token"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                value={resetTokenExpiryState}
                onChange={(e) => setResetTokenExpiryState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Reset Token Expiry"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="checkbox"
                checked={verifiedState}
                onChange={(e) => setVerifiedState(e.target.checked)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              Verified
              <input
                type="number"
                value={verifiedAtState}
                onChange={(e) => setVerifiedAtState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Verified At"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="text"
                value={verifiyTokenState}
                onChange={(e) => setVerifiyTokenState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white"
                placeholder="Verify Token"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                value={verifiyTokenExpiryState}
                onChange={(e) => setVerifiyTokenExpiryState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Verify Token Expiry"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="text"
                value={mobileState}
                onChange={(e) => setMobileState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Mobile"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Numele
            </label>
            <div className="relative">
              <input
                type="text"
                value={avatarState}
                onChange={(e) => setAvatarState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Avatar"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={addressState}
                onChange={(e) => setAddressState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Address"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={cityState}
                onChange={(e) => setCityState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="City"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={stateState}
                onChange={(e) => setStateState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="State"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={countryState}
                onChange={(e) => setCountryState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Country"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={zipState}
                onChange={(e) => setZipState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Zip"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={address2State}
                onChange={(e) => setAddress2State(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Address 2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={bioState}
                onChange={(e) => setBioState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Bio"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={websiteState}
                onChange={(e) => setWebsiteState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Website"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={linkedinState}
                onChange={(e) => setLinkedinState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="LinkedIn"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={twitterState}
                onChange={(e) => setTwitterState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Twitter"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={facebookState}
                onChange={(e) => setFacebookState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Facebook"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={instagramState}
                onChange={(e) => setInstagramState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Instagram"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={githubState}
                onChange={(e) => setGithubState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="GitHub"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium dark:text-white"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="date"
                value={dateOfBirthState}
                onChange={(e) => setDateOfBirthState(e.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-stone-700 dark:text-gray-100 dark:peer-focus:text-white dark:placeholder-white"
                placeholder="Date of Birth"
              />
            </div>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </div>
    </>
  );
}
