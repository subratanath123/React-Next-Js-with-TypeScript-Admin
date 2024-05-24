import React from "react";
import Script from 'next/script'
import Link from "next/link";
import {ClerkProvider, SignOutButton, UserProfile} from '@clerk/nextjs'
import {auth, currentUser} from "@clerk/nextjs/server";

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const {sessionClaims} = auth();
    const user = await currentUser();

    if (sessionClaims?.metadata?.role !== "org:admin") {
        return (
            <ClerkProvider>
                <html lang="en">
                <body>
                <SignOutButton></SignOutButton>
                <UserProfile/>
                </body>
                </html>
            </ClerkProvider>
        );
    }

    return (
        <ClerkProvider>
            <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
                <title>One Dollar Super Admin</title>
                <meta content="" name="description"/>
                <meta content="" name="keywords"/>

                <link href="assets/img/favicon.png" rel="icon"/>
                <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon"/>
                <link href="https://fonts.gstatic.com" rel="preconnect"/>
                <link
                    href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
                    rel="stylesheet"/>
                <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"/>
                <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet"/>
                <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet"/>
                <link href="/assets/vendor/quill/quill.snow.css" rel="stylesheet"/>
                <link href="/assets/vendor/quill/quill.bubble.css" rel="stylesheet"/>
                <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet"/>
                <link href="/assets/vendor/simple-datatables/style.css" rel="stylesheet"/>
                <link href="/assets/css/style.css" rel="stylesheet"/>

                <Script src="/assets/vendor/apexcharts/apexcharts.min.js"></Script>
                <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
                <Script src="/assets/vendor/chart.js/chart.umd.js"></Script>
                <Script src="/assets/vendor/echarts/echarts.min.js"></Script>
                <Script src="/assets/vendor/quill/quill.min.js"></Script>
                <Script src="/assets/vendor/simple-datatables/simple-datatables.js"></Script>
                <Script src="/assets/vendor/tinymce/tinymce.min.js"></Script>
                <Script src="/assets/vendor/php-email-form/validate.js"></Script>
                <Script src="/assets/js/main.js"></Script>
            </head>

            <body>
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <Link href="/" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt=""/> <span
                        className="d-none d-lg-block">One Dollar Admin</span>
                    </Link>
                    <i className="bi bi-list toggle-sidebar-btn"></i>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item dropdown pe-3">
                            <Link className="nav-link nav-profile d-flex align-items-center pe-0" href="#"
                                  data-bs-toggle="dropdown"> <img src={user?.imageUrl} alt="Profile"
                                                                  className="rounded-circle"/> <span
                                className="d-none d-md-block dropdown-toggle ps-2">Hello {user?.firstName}</span> </Link>


                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header"><h6>{user?.fullName}</h6>
                                    <span>Super Admin</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><Link className="dropdown-item d-flex align-items-center" href="/profile"> <i
                                    className="bi bi-person"></i> <span>My Profile</span> </Link></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>

                                <li>
                                    <SignOutButton>
                                        <Link className="dropdown-item d-flex align-items-center" href="#">
                                            <i className="bi bi-box-arrow-right"></i> <span>Sign Out</span>
                                        </Link>
                                    </SignOutButton>

                                </li>
                            </ul>
                        </li>

                    </ul>
                </nav>

            </header>
            <aside id="sidebar" className="sidebar">
                <ul className="sidebar-nav" id="sidebar-nav">
                    <li className="nav-item">
                        <Link className="nav-link " href="/">
                            <i className="bi bi-grid"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                              href="#">
                            <i className="bi bi-journal-text"></i>
                            <span>Vip Offer</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </Link>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/offer/vipOffer/create"> <i className="bi bi-circle"></i>
                                    <span>Create VIP Offer</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/offer/vipOffer/list"> <i className="bi bi-circle"></i>
                                    <span>List</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                              href="#">
                            <i className="bi bi-journal-text"></i>
                            <span>General Offer</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </Link>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/offer/generalOffer/create"> <i className="bi bi-circle"></i>
                                    <span>Create General Offer</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/offer/generalOffer/list"> <i className="bi bi-circle"></i>
                                    <span>List</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                              href="#">
                            <i className="bi bi-journal-text"></i>
                            <span>Online Game</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </Link>
                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/offer/onlineGame/create"> <i className="bi bi-circle"></i>
                                    <span>Create Online Game</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/offer/onlineGame/list"> <i className="bi bi-circle"></i>
                                    <span>List</span>
                                </Link>
                            </li>
                        </ul>
                    </li>


                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                              href="#">
                            <i className="bi bi-journal-text"></i>
                            <span>User</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </Link>

                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/user/list"> <i className="bi bi-circle"></i>
                                    <span>User List</span>
                                </Link>
                            </li>
                        </ul>
                    </li>


                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                              href="#">
                            <i className="bi bi-journal-text"></i>
                            <span>Review</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </Link>

                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/review/create"> <i className="bi bi-circle"></i>
                                    <span>Create Review</span>
                                </Link>
                            </li>

                            <li>
                                <Link href="/review/list"> <i className="bi bi-circle"></i>
                                    <span>Review List</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse"
                              href="#">
                            <i className="bi bi-journal-text"></i>
                            <span>Social Information</span>
                            <i className="bi bi-chevron-down ms-auto"></i>
                        </Link>

                        <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                            <li>
                                <Link href="/social"> <i className="bi bi-circle"></i>
                                    <span>Update</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" href="/aboutus">
                            <i className="bi bi-person"></i>
                            <span>About Us</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link collapsed" href="/theme">
                            <i className="bi bi-person"></i>
                            <span>Site Theme Background</span>
                        </Link>
                    </li>

                    <li className="nav-heading">Pages</li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" href="users-profile.html">
                            <i className="bi bi-person"></i>
                            <span>Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" href="pages-faq.html">
                            <i className="bi bi-question-circle"></i>
                            <span>F.A.Q</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link collapsed" href="pages-contact.html">
                            <i className="bi bi-envelope"></i>
                            <span>Contact</span>
                        </Link>
                    </li>

                </ul>
            </aside>

            <main id="main" className="main">
                <div className="pagetitle">
                    {children}
                </div>
            </main>

            <footer id="footer" className="footer">
                <div className="copyright">
                    &copy; Copyright <strong><span>One Dollar Project</span></strong>. All Rights Reserved
                </div>
                <div className="credits">
                    Designed by <Link href="https://bootstrapmade.com/">Brain Axis</Link>
                </div>
            </footer>

            <Link href="#" className="back-to-top d-flex align-items-center justify-content-center">
                <i className="bi bi-arrow-up-short"></i>
            </Link>
            </body>
            </html>
        </ClerkProvider>
    )
}
