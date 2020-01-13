import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";

const TermsandConditions = () => {
  return (
    <div className="container">
      <div className="col-12">
        <Link to="/login" className="btn btn-hollow btn-xo">
          <ArrowLeft size="18" className="button-left-icon" /> Go to the LOGIN
          page
        </Link>
      </div>
      <br />

      <div className="row">
        <div className="col-md-12">
          <h1 className="text-secondary">Terms and Conditions</h1>
          <b>Last updated: November 21, 2019</b>
          <hr />

          <p>
            Please read these Terms and Conditions ("Terms", "Terms and
            Conditions") carefully before using the{" "}
            <span className="text-info"> https://hr-ems.herokuapp.com</span>{" "}
            website (the "Service") operated by Dzenis H. ("I" or "my").
          </p>

          <p>
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users and others who access or use the Service.
          </p>

          <p>
            By accessing or using the Service you agree to be bound by these
            Terms. If you disagree with any part of the terms then you may not
            access the Service.
          </p>

          <br />

          <h3 className="text-secondary">Links To Other Web Sites</h3>

          <p>
            The Service may contain links to third-party web sites or services
            that are not owned or controlled by this Service.
          </p>

          <p>
            The service has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third party web
            sites or services. You further acknowledge and agree that Mars-EMS
            shall not be responsible or liable, directly or indirectly, for any
            damage or loss caused or alleged to be caused by or in connection
            with use of or reliance on any such content, goods or services
            available on or through any such web sites or services.
          </p>

          <p>
            I strongly advise you to read the terms and conditions and privacy
            policies of any third-party web sites or services that you visit.
          </p>

          <br />

          <h3 className="text-secondary">Termination</h3>

          <p>
            I may terminate or suspend access to the Service immediately,
            without prior notice or liability, for any reason whatsoever,
            including without limitation if you breach the Terms.
          </p>

          <p>
            All provisions of the Terms which by their nature should survive
            termination shall survive termination, including, without
            limitation, ownership provisions, warranty disclaimers, indemnity
            and limitations of liability.
          </p>

          <br />

          <h3 className="text-secondary">Governing Law</h3>

          <p>
            These Terms shall be governed and construed in accordance with the
            laws of Bosnia and Herzegovina, without regard to its conflict of
            law provisions.
          </p>

          <p>
            My failure to enforce any right or provision of these Terms will not
            be considered a waiver of those rights. If any provision of these
            Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding my
            Service, and supersede and replace any prior agreements we might
            have between us regarding the Service.
          </p>

          <br />

          <h2 className="text-secondary">Changes</h2>

          <p>
            I reserve the right, at my sole discretion, to modify or replace
            these Terms at any time. If a revision is material I will try to
            provide at least 30 days notice prior to any new terms taking
            effect. What constitutes a material change will be determined at my
            sole discretion.
          </p>

          <p>
            By continuing to access or use my Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </p>

          <br />

          <h2>Contact Me</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact me:
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

export default TermsandConditions;
