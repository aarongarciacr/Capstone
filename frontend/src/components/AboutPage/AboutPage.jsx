import "./AboutPage.css";

function AboutPage() {
  return (
    <main>
      <div className="main-container">
        <div className="about-container">
          <h1>About Us</h1>;
          <p>
            Welcome to Ear Trainer, your ultimate platform for personalized
            music education and practice. Whether you&apos;re a teacher looking
            to manage and assign exercises to your students or a student eager
            to improve your music skills, Ear Trainer has everything you need to
            grow and succeed. At Ear Trainer, we believe in the transformative
            power of music and the importance of fostering a supportive learning
            environment. Our platform is designed to empower teachers with
            innovative tools to track progress, evaluate assignments, and
            customize exercises, all while giving students the flexibility to
            practice and enhance their skills at their own pace.
          </p>
        </div>
        <div className="mission-container">
          <h1>Our Mission</h1>;
          <p>
            Our mission is to bridge the gap between traditional music education
            and modern technology. We strive to provide a dynamic, interactive,
            and engaging platform that supports teachers and students in
            achieving their musical goals.
          </p>
        </div>
        <div className="offer-container">
          <h1>What We Offer</h1>;
          <ul>
            <li>
              <p>
                <span className="bold-p">Customizable Exercises:</span> Teachers
                can create and assign exercises tailored to their students&apos;
                needs, focusing on areas like melody transcription, chord
                identification, and interval recognition.
              </p>
            </li>{" "}
            <li>
              <p>
                <span className="bold-p">Student Progress Tracking:</span> With
                detailed analytics and stats, teachers can monitor their
                students&apos; performance and provide targeted feedback.
              </p>
            </li>{" "}
            <li>
              <p>
                <span className="bold-p">Interactive Assignments:</span>{" "}
                Students receive assignments with clear instructions, practice
                tools, and instant feedback to improve their skills efficiently.
              </p>
            </li>{" "}
            <li>
              <p>
                <span className="bold-p">User-Friendly Design:</span> An
                intuitive interface for both teachers and students ensures a
                seamless and enjoyable experience.
              </p>
            </li>{" "}
          </ul>
        </div>
        <div className="team-container">
          <h1>Our Team</h1>;
          <p>
            We are a passionate team of musicians, educators, and developers
            dedicated to revolutionizing the way music is taught and learned.
            With years of experience in music education and technology, we
            understand the challenges and opportunities in music learning. Our
            goal is to make music education more accessible, interactive, and
            effective for everyone.
          </p>
        </div>
        <div className="join-container">
          <h1>Join Us</h1>;
          <p>
            Whether you&apos;re a teacher seeking to inspire the next generation
            of musicians or a student striving to unlock your potential, Ear
            Trainer is here to guide you every step of the way. Together,
            let&apos;s make learning music a more rewarding and joyful
            experience.
          </p>
        </div>
        <div className="footer-container">
          <p>
            Thank you for choosing Ear Trainer! If you have any questions,
            feedback, or ideas, feel free to contact us. Let&apos;s make music
            together! 🎵
          </p>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
