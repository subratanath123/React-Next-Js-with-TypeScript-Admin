'use client'

import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function ShowProfile() {
    const router = useRouter();

    const [state, setState] = useState({
        submitting: true,
        name: '',
        email: '',
        designation: '',
        imageId: '',
    });

    return (
        <>
            <section className="section profile">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">

                                <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle">

                                </img>
                                <h2>{state.name}</h2>
                                <h3>{state.designation}</h3>
                                <div className="social-links mt-2">
                                    <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                    <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )

}

