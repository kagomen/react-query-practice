import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(
	cors({
		origin: 'https://react-query-practice.pages.dev'
	})
)

app.get('/search/:keyword/:page', async (c) => {
	try {
		const keyword = c.req.param('keyword')
		const page = c.req.param('page')
		const url = `${c.env.API_URL}?format=json&keyword=${keyword}&booksGenreId=000&page=${page}&applicationId=${c.env.API_KEY}`
		const response = await fetch(url)
		const data = await response.json()

		const filteredBooks = data.Items.filter((item) => item.Item.isbn !== '')
		const filteredData = {
			...data,
			Items: filteredBooks
		}

		return c.json(filteredData)
	} catch (e) {
		return c.json({ error: `Error: ${e.message}` }, 500)
	}
})

export default app
