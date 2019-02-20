import React from "react";

const ProfileSection = ({user}) => {
    const address = user.address ? user.address : ""
    return (
        <section className="profile__content text-center">
            <h2>Profile</h2>
            <ul>
                <li>
                    <strong>Address: </strong> {`${address.street}, ${address.suite}, ${address.city} - ${address.zipcode}`}
                </li>
                <li>
                    <strong>Phone: </strong> {user.phone}
                </li>
                <li>
                    <strong>Company: </strong> {user.company ? user.company.name : ""}
                </li>
                <li>
                    <strong>Website: </strong> {user.website}
                </li>
            </ul>
        </section>
    )
}
export default ProfileSection;