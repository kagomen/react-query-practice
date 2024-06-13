import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(
	cors({
		origin: 'https://proxy-server-practice.pages.dev'
	})
)

app.get('/search/:keyword', async (c) => {
	try {
		const keyword = c.req.param('keyword')
		const url = `${c.env.API_URL}?format=json&keyword=${keyword}&booksGenreId=000&applicationId=${c.env.API_KEY}`
		const response = await fetch(url)
		const data = await response.json()

		const filteredBooks = data.Items.filter((item) => item.Item.isbn !== '')
		const filteredData = {
			...data,
			Items: filteredBooks
		}

		return c.json(filteredData)
	} catch (err) {
		return c.json({ error: `Error: ${err.message}` }, 500)
	}
})

export default app
