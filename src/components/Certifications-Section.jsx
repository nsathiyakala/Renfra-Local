"use client"

import { useState } from "react"
import AccordionItem from "./Accordion-Item"

export function CertificationsSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (    <div className="w-full max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12 space-y-4">
        <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base max-w-4xl mx-auto">
          At Renfra Energy, our commitment to excellence is reflected in every aspect of our operations. We follow
          globally recognized standards to ensure quality, safety, and sustainability across all our projects. Through
          certified systems and innovative practices, we strive to deliver solutions that empower people and protect the
          planet.
        </p>
      </div>

      {/* Accordions */}
      <div className="border border-border rounded-lg overflow-hidden">
        {/* ISO Certifications */}
        <AccordionItem title="ISO Certifications" isOpen={openIndex === 0} onClick={() => toggleAccordion(0)}>
          <div className="space-y-6">
            <div>
              <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base mb-2">
                Renfra Energy is committed to achieving customer satisfaction, loyalty, and confidence by providing credible, prompt, and complete renewable solutions of international quality to all stakeholders in the wind and solar energy sectors, including turnkey project execution and operation & maintenance services.
              </p>
              <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                We are a, ISO certified company with management system certifications for:
              </p>
            </div>

            {/* ISO Badges Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
<div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border-2 border-dotted border-[#D3D3D3]">
  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-3">
    <img
      src="/images/iso.png"
      alt="ISO Logo"
      className="w-22 h-22 object-contain"
    />
  </div>
  <p className="text-md text-[#3CA948] font-bold text-center">ISO 9001:2015</p>
  <p className="text-xs text-[#293E52] text-center mt-1">(Quality Management System)</p>
</div>



             <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border-2 border-dotted border-[#D3D3D3]">
  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-3">
    <img
      src="/images/iso.png"
      alt="ISO Logo"
      className="w-22 h-22 object-contain"
    />
  </div>
  <p className="text-md text-[#3CA948] font-bold text-center">ISO  14001:2015  </p>
  <p className="text-xs text-[#293E52] text-center mt-1">(Environmental Management System)</p>
</div>

             <div className="flex flex-col items-center justify-center p-4 bg-background rounded-lg border-2 border-dotted border-[#D3D3D3]">
  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-3">
    <img
      src="/images/iso.png"
      alt="ISO Logo"
      className="w-22 h-22 object-contain"
    />
  </div>
  <p className="text-md text-[#3CA948] font-bold text-center">3.	ISO 45001:2018 </p>
  <p className="text-xs text-[#293E52] text-center mt-1">(Occupational Health and Safety)</p>
</div>
            </div> */}


               <div>
              <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                Renfra Energy’s human resources adhere to strict QA procedures and plans which defines, selects, implements and assures quality during survey, design, procurement, erection, installation and commissioning of the projects.
              </p>
              <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                Similarly, we at Renfra Energy priortise and ensure the safety of our entire human resources and contractors engaged in the construction and operation and maintenance in the projects. By establishing strict safety protocols, regular training programs and adhering to operational and maintenance checklists, we ensure high Safe Man Hours at all our project sites. 
              </p>
              <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                As a committed company focusing on sustainability and environmental protection, we strictly adhere to the ISO 14001 systems that aims at reducing the environmental impact and improve our sustainability goals. 
              </p>
            </div>
          </div>
        </AccordionItem>

        {/* Quality */}
        <AccordionItem title="Quality" isOpen={openIndex === 1} onClick={() => toggleAccordion(1)}>
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                At Renfra Energy India Ltd., innovation and precision engineering form the foundation of everything we build. Our meticulously designed solar solutions ensure superior performance, long-term durability, and uncompromised safety—even in elevated and complex installations. By adhering to rigorous quality and safety standards, we deliver reliable systems that reflect our commitment to engineering excellence and sustainable development.
              </p>

                 <p className="mb-2 text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                As a growing force in India’s renewable energy journey, Renfra Energy understands the unique demands of the Indian market. As a trusted solar EPC company, we specialize in assessing customer requirements, local climatic conditions, and site-specific challenges to deliver the most efficient and cost-effective solar solutions.
              </p>

                 <p className="mb-2 text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                Step into a cleaner, sun-powered future with Renfra Energy. Experience the impact of thoughtfully engineered renewable solutions that empower communities and contribute to a greener planet.
              </p>

               <p className="mb-2 text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                Partner with Renfra Energy India Ltd. and let the power of the sun create lasting value for generations to come.
              </p>
              {/* <p className="text-[#293E52] font-semibold text-sm sm:text-[14px] md:text-[16px] lg:text-[18px]">Our Quality Focus</p> */}
            </div>

            {/* <ul className="space-y-1">
              <li className="flex items-start gap-3">
                <span className="text-primary mb-2">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </span>
              </li> 
              <li className="flex items-start gap-3">
                <span className="text-primary mb-2">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mb-2">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</span>
              </li>
            
            </ul> */}
          </div>
        </AccordionItem>

        {/* Health and Safety */}
        <AccordionItem title="Health and Safety" isOpen={openIndex === 2} onClick={() => toggleAccordion(2)}>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                At Renfra Energy India Ltd., health and safety are core values in all our renewable energy operations. We are committed to preventing injuries, protecting the environment, and ensuring safe working conditions for everyone.”

              </p>
              <p className="text-[#293E52] font-semibold text-sm sm:text-[14px] md:text-[16px] lg:text-[18px] mt-4">Health and Safety Commitment</p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary mb-2">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">Renfra Energy India Ltd. is committed to achieving excellence in Health, Safety, and Environmental (HSE) performance in line with ISO 45001 and ISO 14001 principles.
</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mb-2">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
We systematically identify hazards, assess risks, and implement effective control measures to prevent incidents and minimize environmental impacts.                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mb-2">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
Our leadership ensures full compliance with all applicable legal, statutory, and regulatory requirements.                </span>
              </li>
               <li className="flex items-start gap-3">
                <span className="text-primary mb-2">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
We promote continuous improvement through regular training, internal audits, and active employee participation.               </span>
              </li>
               <li className="flex items-start gap-3">
                <span className="text-primary mb-2">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
Sustainability and safety are integrated into every phase of our renewable energy projects, including wind, solar, and O&M operations.              </span>
              </li>
              
            </ul>

             <div>
              <p className="text-[#293E52] font-semibold mb-3 text-sm sm:text-[14px] md:text-[16px] lg:text-[18px]">CMD's commitment</p>
              <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
              The CMD of Renfra Energy India Ltd. is committed to providing a safe, healthy, and environmentally responsible workplace and to achieving zero harm across all renewable energy projects.
              </p>
            </div>

            <div>
              <p className="text-[#293E52] font-semibold mb-3 text-sm sm:text-[14px] md:text-[16px] lg:text-[18px]">Goal</p>
              <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
              Our measurable HSE goals include Zero Harms, Zero Lost Time Injuries (LTI), Zero major environmental incidents, and 100% HSE training coverage for employees and contractors.

              </p>
            </div>
          </div>
        </AccordionItem>

        {/* Policy */}
        <AccordionItem title="Corporate Governance & Policy Framework" isOpen={openIndex === 3} onClick={() => toggleAccordion(3)}>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
                At Renfra Energy, we are committed to conducting our business with the highest standards of ethics, integrity, safety, and regulatory compliance. Our comprehensive policy framework establishes clear guidelines for responsible business conduct, risk management, employee welfare, and sustainable operations across all levels of the organization.

              </p>
              <p className="text-[#293E52]  font-semibold text-sm sm:text-[14px] md:text-[16px] lg:text-[18px] mt-4">Our policies collectively aim to:</p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
Promote ethical conduct, transparency, and accountability in all business activities,Ensure zero tolerance towards bribery, corruption, fraud, and unethical practices Maintain a safe, healthy, and respectful workplace free from harassment, discrimination, violence, drugs, and alcohol
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">Lorem ipsum dolor sit amet, Protect human rights, including strict prohibition of child labor and forced labor
Encourage open communication through a grievance redressal and whistleblower mechanism Strengthen corporate governance, leadership accountability, and fair remuneration practices.

</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
Ensure data security, confidentiality, and responsible electronic communication                </span>
              </li>
               <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
Support social responsibility, sustainability, and environmental stewardship              </span>
              </li>
               <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
Comply with all applicable legal, statutory, and regulatory requirements              </span>
              </li>
             
            </ul>

               <div>
              <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
              These policies are applicable to all employees, directors, contractors, and business partners of Renfra Energy. Regular awareness programs, training sessions, and internal reviews are conducted to ensure effective implementation and continuous improvement.
              </p>
              <p className="text-[#293E52] text-sm sm:text-sm md:text-base lg:text-base">
              Renfra Energy remains committed to responsible growth, operational excellence, and long-term value creation for all stakeholders.
              </p>
            </div>

          </div>
        </AccordionItem>
      </div>
    </div>
  )
}