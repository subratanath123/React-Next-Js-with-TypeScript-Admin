import React from "react";
import Script from 'next/script'
import Head from "next/head";
import Link from "next/link";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
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
                <Link href="index.html" className="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt=""/> <span className="d-none d-lg-block">One Dollar Admin</span>
                </Link>
                <i className="bi bi-list toggle-sidebar-btn"></i>
            </div>

            <div className="search-bar">
                <form className="search-form d-flex align-items-center" method="POST" action="#">
                    <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>
                    <button type="submit" title="Search"><i className="bi bi-search"></i></button>
                </form>
            </div>

            <nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">

                    <li className="nav-item d-block d-lg-none"><Link className="nav-link nav-icon search-bar-toggle "
                                                                     href="#">
                        <i className="bi bi-search"></i> </Link>
                    </li>

                    <li className="nav-item dropdown">
                        <Link className="nav-link nav-icon" href="#" data-bs-toggle="dropdown"> <i
                            className="bi bi-bell"></i>
                            <span className="badge bg-primary badge-number">4</span> </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                            <li className="dropdown-header"> You have 4 new notifications <Link href="#"><span
                                className="badge rounded-pill bg-primary p-2 ms-2">View all</span></Link></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="notification-item"><i
                                className="bi bi-exclamation-circle text-warning"></i>
                                <div><h4>Lorem Ipsum</h4>               <p>Quae dolorem earum veritatis oditseno</p>
                                    <p>30 min. ago</p></div>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="notification-item"><i className="bi bi-x-circle text-danger"></i>
                                <div><h4>Atque rerum nesciunt</h4>               <p>Quae dolorem earum veritatis
                                    oditseno</p>               <p>1 hr. ago</p></div>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="notification-item"><i className="bi bi-check-circle text-success"></i>
                                <div><h4>Sit rerum fuga</h4>               <p>Quae dolorem earum veritatis
                                    oditseno</p>               <p>2 hrs. ago</p></div>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="notification-item"><i className="bi bi-info-circle text-primary"></i>
                                <div><h4>Dicta reprehenderit</h4>               <p>Quae dolorem earum veritatis
                                    oditseno</p>               <p>4 hrs. ago</p></div>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li className="dropdown-footer"><Link href="#">Show all notifications</Link></li>
                        </ul>

                    </li>

                    <li className="nav-item dropdown pe-3">
                        <Link className="nav-link nav-profile d-flex align-items-center pe-0" href="#"
                              data-bs-toggle="dropdown"> <img src="assets/img/profile-img.jpg" alt="Profile"
                                                              className="rounded-circle"/> <span
                            className="d-none d-md-block dropdown-toggle ps-2">Subrata Nath</span> </Link>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header"><h6>Subrata Nath</h6>
                                <span>Developer</span>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><Link className="dropdown-item d-flex align-items-center" href="/profile/"> <i
                                className="bi bi-person"></i> <span>My Profile</span> </Link></li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li>
                                <hr className="dropdown-divider"/>
                            </li>
                            <li><Link className="dropdown-item d-flex align-items-center" href="#"> <i
                                className="bi bi-box-arrow-right"></i> <span>Sign Out</span> </Link></li>
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
                    <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i>
                            <span>Banner</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </Link>
                    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link href="/banner/create"> <i className="bi bi-circle"></i>
                                <span>Create Banner</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/banner/list"> <i className="bi bi-circle"></i>
                                <span>Banner List</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i>
                        <span>Vip Offer</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </Link>
                    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link href="/banner/vipOffer/create"> <i className="bi bi-circle"></i>
                                <span>Create VIP Offer</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/banner/vipOffer/list"> <i className="bi bi-circle"></i>
                                <span>List</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                        <i className="bi bi-journal-text"></i>
                        <span>Customer</span>
                        <i className="bi bi-chevron-down ms-auto"></i>
                    </Link>

                    <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
                        <li>
                            <Link href="/customer/list"> <i className="bi bi-circle"></i>
                                <span>Customer List</span>
                            </Link>
                        </li>
                    </ul>
                </li>


                <li className="nav-item">
                    <Link className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
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
    )
}
