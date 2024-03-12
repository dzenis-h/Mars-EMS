import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="container">
      <div className="col-12">
        <NavLink to="/about" className="btn btn-hollow btn-xo">
          <FaArrowLeftLong size="18" className="button-left-icon" />
          Go back
        </NavLink>
      </div>
      <br />

      <div className="row">
        <div className="col-md-12">
          <h1 className="text-secondary">Privacy Policy</h1>
          <b>Effective date: September 20, 2019</b>
          <hr />

          <p>
            Please read the Privacy Policies carefully before using the{" "}
            <span className="text-info"> https://hr-ems.herokuapp.com</span>{" "}
            website (the "Service") operated by Dzenis H. ("I" or "my").
          </p>

          <p>
            This page informs you of the policies regarding the collection, use,
            and disclosure of personal data when you use this Service and the
            choices you have associated with that data.
          </p>

          <p>
            <b>I don't use any of your data</b> to provide or improve the
            Service. If at any time there is a need to collect any type of
            personal information you will be previously informed and if you
            choose to share your personal information using this Service, you
            consent to the collection and use of the information in accordance
            with these policies. Unless otherwise defined in this Privacy
            Policy, terms used in this Privacy Policy have the same meanings as
            in our Terms and Conditions, accessible from{" "}
            <span className="text-info">
              https://hr-ems.herokuapp.com/terms
            </span>
          </p>

          <br />

          <h3>Types of Data Collected</h3>

          <h4 className="text-secondary">Personal Data</h4>

          <p>
            By default no Perosnal Data is used. While using our Service we may
            ask you to provide us with certain personally identifiable
            information that can be used to contact or identify you ("Personal
            Data"). Personally identifiable information may include:
          </p>

          <ul className="about">
            <li>Cookies and Usage Data</li>
          </ul>

          <br />

          <h4 className="text-secondary">Usage Data</h4>

          <p>
            The Service may also collect information how the Service is accessed
            and used ("Usage Data"). This Usage Data may include information
            such as your computer's Internet Protocol address (e.g. IP address),
            browser type, browser version, the pages of our Service that you
            visit, the time and date of your visit, the time spent on those
            pages, unique device identifiers and other diagnostic data.
          </p>

          <br />

          <h4 className="text-secondary">Tracking & Cookies Data</h4>
          <p>
            I use cookies to track the activity on our Service and hold certain
            information.
          </p>
          <p>
            Cookies are files with small amount of data which may include an
            anonymous unique identifier. Cookies are sent to your browser from a
            website and stored on your device. Tracking technologies also used
            are beacons, tags, and scripts to collect and track information and
            to improve and analyze our Service.
          </p>

          <p>
            You can instruct your browser to refuse all cookies or to indicate
            when a cookie is being sent. However, if you do not accept cookies,
            you may not be able to use some portions of our Service.
          </p>

          <br />

          <p>Examples of Cookies used:</p>

          <ul className="about">
            <li>
              <b>Session Cookies.</b> - to operate the Service.
            </li>
            <li>
              <b>Security Cookies.</b> - for security purposes.
            </li>
          </ul>

          <br />

          <h2>Use of Data</h2>

          <p>The Service uses the collected data for various purposes:</p>

          <ul className="about">
            <li>To provide and maintain the Service</li>
            <li>To provide customer care and support</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <br />

          <h2>Transfer Of Data</h2>

          <p>
            Your information, including Personal Data, is NOT going to be
            transferred to — or maintained on — computers located outside of
            your state, province, country or other governmental jurisdiction
            where the data protection laws may differ than those from your
            jurisdiction.
          </p>

          <p>
            Your consent to this Privacy Policy followed by your submission of
            such information represents your agreement to that transfer.
          </p>

          <p>
            I will take all steps reasonably necessary to ensure that your data
            is treated securely and in accordance with this Privacy Policy and
            no transfer of your Personal Data will take place to an organization
            or a country unless there are adequate controls in place including
            the security of your data and other personal information.
          </p>

          <br />

          <h2>Disclosure Of Data</h2>

          <h3 className="text-secondary">Legal Requirements</h3>
          <p>
            This Service is NOT going to disclose your Personal Data at any
            circumstances.
          </p>

          <br />

          <h3 className="text-secondary">Security Of Data</h3>

          <p>
            The security of data is very important to me, but remember that no
            method of transmission over the Internet, or method of electronic
            storage is 100% secure. While I strive to use commercially
            acceptable means to protect Personal Data, I cannot guarantee its
            absolute security.
          </p>

          <br />

          <h3 className="text-secondary">Service Providers</h3>

          <p>
            This Service may employ third party companies and individuals to
            facilitate our Service ("Service Providers"), to provide the Service
            on our behalf, to perform Service-related services or to assist us
            in analyzing how our Service is used.
          </p>

          <p>
            If you choose to provide any type of Personal Data, these third
            parties would have access to your Personal Data only to perform
            these tasks on our behalf and are obligated not to disclose or use
            it for any other purpose.
          </p>

          <br />

          <h3 className="text-secondary">Links To Other Sites</h3>

          <p>
            The Service may contain links to other sites that are not operated
            by us. If you click on a third party NavLink, you will be directed
            to that third party's site. We strongly advise you to review the
            Privacy Policy of every site you visit.
          </p>

          <p>
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
          </p>

          <br />

          <h3 className="text-secondary">Changes To This Privacy Policy</h3>

          <p>
            I may update the Privacy Policy from time to time. I will notify you
            of any changes by posting the new Privacy Policy on this page.
          </p>

          <p>
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>

          <br />

          <h2>Contact Me</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            me:
          </p>

          <ul className="about">
            <li>
              By email:
              <span className="text-info">
                <a href="mailto:dzenis.hankusic@gmail.com">
                  {" "}
                  dzenis.hankusic@gmail.com
                </a>
              </span>
            </li>
            <li>
              By visiting this page on my website:
              <span className="text-info">
                <a
                  href="https://dzenis-h.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  https://dzenis-h.com/contact
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
