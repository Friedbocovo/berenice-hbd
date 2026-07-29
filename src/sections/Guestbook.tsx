import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Reveal, SectionTitle, stagger, fadeUp } from '@/components/motion'

interface Entry {
  id: string
  name: string
  message: string
  created_at: string
}

export function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase
      .from('guestbook_entries')
      .select('id, name, message, created_at')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setEntries(data as Entry[])
      })
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('guestbook_entries')
      .insert({ name: name.trim(), message: message.trim() })
      .select('id, name, message, created_at')
      .single()
    setLoading(false)
    if (error) {
      setError("Une erreur est survenue. Réessaie dans un instant.")
      return
    }
    setEntries((prev) => [data as Entry, ...prev])
    setName('')
    setMessage('')
  }

  return (
    <section className="section-shell">
      <SectionTitle eyebrow="Livre d'or" title="Laisse un petit mot" subtitle="Ton message rejoindra ceux des autres personnes qui ont souhaité un joyeux anniversaire." />

      <div className="mx-auto max-w-2xl">
        <Reveal amount={0.2}>
          <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ton prénom"
              maxLength={40}
              className="w-full rounded-2xl border border-lavande-200 bg-white/70 px-4 py-3 font-sans text-lavande-800 placeholder-lavande-400 outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ton petit mot..."
              maxLength={280}
              rows={3}
              className="mt-3 w-full resize-none rounded-2xl border border-lavande-200 bg-white/70 px-4 py-3 font-sans text-lavande-800 placeholder-lavande-400 outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-lavande-400">{message.length}/280</span>
              <button
                type="submit"
                disabled={loading || !name.trim() || !message.trim()}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                <span>Publier</span>
              </button>
            </div>
            {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}
          </form>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-8 space-y-4"
        >
          {entries.length === 0 && (
            <Reveal>
              <p className="text-center text-lavande-500/70">Sois la première personne à laisser un mot. ✨</p>
            </Reveal>
          )}
          {entries.map((entry) => (
            <motion.div key={entry.id} variants={fadeUp} initial="hidden" animate="show" className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-lavande-700">{entry.name}</span>
                <span className="text-xs text-lavande-400">
                  {new Date(entry.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-lavande-700/80">{entry.message}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
