import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail, HiHeart } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold text-white">
              {personalInfo.initials}
            </div>
            <p className="text-sm text-text-secondary/60">
              © {new Date().getFullYear()} {personalInfo.name}. Crafted with{' '}
              <HiHeart className="inline w-3.5 h-3.5 text-red-500 mx-0.5 opacity-70" /> and lots of coffee.
            </p>
          </div>

          {/* Right - Social Icons */}
          <div className="flex gap-3">
            {[
              { icon: FaGithub, href: personalInfo.socialLinks.github, label: 'GitHub' },
              { icon: FaLinkedin, href: personalInfo.socialLinks.linkedin, label: 'LinkedIn' },
              { icon: HiMail, href: personalInfo.socialLinks.email, label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-text-secondary hover:text-blue-primary transition-colors border border-glass-border"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
