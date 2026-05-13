export const templates = [
  {
    id: 'blank',
    label: 'Blank Document',
    imageUrl: '/blank-document.svg',
    initialContent: '',
  },
  {
    id: 'software-proposal',
    label: 'Software Proposal',
    imageUrl: '/software-proposal.svg',
    initialContent: `
      <h1>Software Development Proposal</h1>
      <h2>Project Overview</h2>
      <p>Brief description of the proposed software project.</p>

      <h2>Scope of Work</h2>
      <p>The project will involve the following key deliverables:</p>
      <ul>
        <li>Requirement analysis and documentation</li>
        <li>System architecture and design</li>
        <li>Frontend and backend development</li>
        <li>Testing and quality assurance</li>
        <li>Deployment and post-launch support</li>
      </ul>

      <h2>Timeline</h2>
      <table>
        <tr>
          <th>Phase</th>
          <th>Duration</th>
          <th>Deliverables</th>
        </tr>
        <tr>
          <td>Discovery &amp; Planning</td>
          <td>2 Weeks</td>
          <td>Requirements document, project plan</td>
        </tr>
        <tr>
          <td>Design</td>
          <td>3 Weeks</td>
          <td>Wireframes, UI/UX mockups, architecture</td>
        </tr>
        <tr>
          <td>Development</td>
          <td>8 Weeks</td>
          <td>Working application, source code</td>
        </tr>
        <tr>
          <td>Testing &amp; QA</td>
          <td>2 Weeks</td>
          <td>Test reports, bug fixes</td>
        </tr>
        <tr>
          <td>Deployment</td>
          <td>1 Week</td>
          <td>Production deployment, documentation</td>
        </tr>
      </table>

      <h2>Budget</h2>
      <p>The estimated budget for this project is [amount]. This includes all phases of development, testing, and initial deployment support.</p>

      <h2>Terms &amp; Conditions</h2>
      <p>Payment will be structured in milestones aligned with project phases. Detailed terms will be outlined in the final contract.</p>
    `,
  },
  {
    id: 'project-proposal',
    label: 'Project Proposal',
    imageUrl: '/project-proposal.svg',
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Executive Summary</h2>
      <p>Provide a high-level overview of the project, its objectives, and expected outcomes.</p>

      <h2>Problem Statement</h2>
      <p>Describe the problem or opportunity this project aims to address. Include relevant data and context.</p>

      <h2>Proposed Solution</h2>
      <p>Outline the proposed approach and methodology. Explain why this solution is the most effective option.</p>

      <h2>Goals &amp; Objectives</h2>
      <ul>
        <li>Define clear, measurable goals for the project</li>
        <li>Identify key performance indicators (KPIs)</li>
        <li>Set realistic milestones and deadlines</li>
      </ul>

      <h2>Stakeholders</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Responsibility</th>
        </tr>
        <tr>
          <td>[Name]</td>
          <td>Project Sponsor</td>
          <td>Overall project oversight and funding</td>
        </tr>
        <tr>
          <td>[Name]</td>
          <td>Project Manager</td>
          <td>Day-to-day management and coordination</td>
        </tr>
        <tr>
          <td>[Name]</td>
          <td>Technical Lead</td>
          <td>Technical decisions and architecture</td>
        </tr>
      </table>

      <h2>Budget &amp; Resources</h2>
      <p>Provide an itemized breakdown of costs, resources needed, and any external dependencies.</p>

      <h2>Risk Assessment</h2>
      <p>Identify potential risks and mitigation strategies for each.</p>

      <h2>Conclusion</h2>
      <p>Summarize the value of the project and the next steps for approval.</p>
    `,
  },
  {
    id: 'business-letter',
    label: 'Business Letter',
    imageUrl: '/business-letter.svg',
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Title]</p>
      <p>[Your Company]</p>
      <p>[Your Address]</p>
      <p>[City, State, ZIP Code]</p>
      <p>[Date]</p>
      <br />
      <p>[Recipient Name]</p>
      <p>[Recipient Title]</p>
      <p>[Recipient Company]</p>
      <p>[Recipient Address]</p>
      <p>[City, State, ZIP Code]</p>
      <br />
      <p>Dear [Recipient Name],</p>
      <br />
      <p>I am writing to [state the purpose of your letter]. I would like to bring to your attention [briefly describe the matter at hand].</p>
      <p>In the following paragraphs, provide more details about the subject. Include any relevant background information, supporting facts, and context that will help the reader understand the situation fully.</p>
      <p>If you are making a specific request, clearly state what action you would like the recipient to take. Be precise about deadlines, expectations, or next steps.</p>
      <br />
      <p>Thank you for your time and consideration. I look forward to your response. Please do not hesitate to contact me at [your phone number] or [your email address] if you have any questions.</p>
      <br />
      <p>Sincerely,</p>
      <br />
      <p>[Your Name]</p>
      <p>[Your Title]</p>
    `,
  },
  {
    id: 'resume',
    label: 'Resume',
    imageUrl: '/resume.svg',
    initialContent: `
      <h1>[Your Full Name]</h1>
      <p>[Your Email] &bull; [Your Phone Number] &bull; [City, State] &bull; [LinkedIn / Portfolio URL]</p>
      <hr />

      <h2>Professional Summary</h2>
      <p>Results-driven professional with [X] years of experience in [your field/industry]. Proven track record in [key skill 1], [key skill 2], and [key skill 3]. Seeking to leverage expertise to contribute to [target role or company].</p>

      <h2>Work Experience</h2>
      <h3>[Job Title] — [Company Name]</h3>
      <p><em>[Start Date] – [End Date] &bull; [Location]</em></p>
      <ul>
        <li>Led [project/initiative] resulting in [quantifiable result, e.g., 20% increase in efficiency]</li>
        <li>Collaborated with cross-functional teams to deliver [product/feature] on time and within budget</li>
        <li>Developed and maintained [system/process] that improved [metric] by [percentage]</li>
      </ul>

      <h3>[Job Title] — [Company Name]</h3>
      <p><em>[Start Date] – [End Date] &bull; [Location]</em></p>
      <ul>
        <li>Managed [team size] team members and oversaw [project scope]</li>
        <li>Implemented [strategy/tool] that reduced [cost/time] by [percentage]</li>
        <li>Provided [service/support] to [number] clients with a [satisfaction rate]% satisfaction rate</li>
      </ul>

      <h2>Education</h2>
      <h3>[Degree] in [Field of Study]</h3>
      <p><em>[University Name] — [Graduation Year]</em></p>

      <h2>Skills</h2>
      <ul>
        <li>[Skill 1] &bull; [Skill 2] &bull; [Skill 3] &bull; [Skill 4]</li>
        <li>[Tool/Technology 1] &bull; [Tool/Technology 2] &bull; [Tool/Technology 3]</li>
      </ul>
    `,
  },
  {
    id: 'cover-letter',
    label: 'Cover Letter',
    imageUrl: '/cover-letter.svg',
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[City, State, ZIP Code]</p>
      <p>[Your Email] &bull; [Your Phone]</p>
      <p>[Date]</p>
      <br />
      <p>[Hiring Manager's Name]</p>
      <p>[Company Name]</p>
      <p>[Company Address]</p>
      <p>[City, State, ZIP Code]</p>
      <br />
      <p>Dear [Hiring Manager's Name],</p>
      <br />
      <p>I am excited to apply for the [Job Title] position at [Company Name]. With my background in [relevant field/skill] and a passion for [industry/area], I am confident that I would be a valuable addition to your team.</p>
      <p>In my current role at [Current/Previous Company], I have [describe a key accomplishment or responsibility relevant to the target job]. This experience has equipped me with strong skills in [skill 1], [skill 2], and [skill 3], which align closely with the requirements outlined in your job posting.</p>
      <p>I am particularly drawn to [Company Name] because of [specific reason — company culture, mission, recent project, product]. I believe my [specific skill or quality] would allow me to contribute meaningfully to [specific team or initiative].</p>
      <p>I would welcome the opportunity to discuss how my experience and skills can benefit your team. I am available for an interview at your earliest convenience and can be reached at [your phone number] or [your email address].</p>
      <br />
      <p>Thank you for your time and consideration.</p>
      <br />
      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: 'letter',
    label: 'Letter',
    imageUrl: '/letter.svg',
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[City, State, ZIP Code]</p>
      <p>[Date]</p>
      <br />
      <p>Dear [Recipient's Name],</p>
      <br />
      <p>I hope this letter finds you well. I am writing to [state the purpose of your letter — share news, extend an invitation, express thanks, make a request, etc.].</p>
      <p>[Continue with the main body of your letter. Provide the relevant details, context, or information that supports the purpose stated above. If there are multiple points, consider using separate paragraphs for clarity.]</p>
      <p>[If appropriate, conclude with a call to action, a request for a response, or next steps. Express appreciation for the recipient's time.]</p>
      <br />
      <p>Warm regards,</p>
      <br />
      <p>[Your Name]</p>
    `,
  },
];
