puts "🌱 Starting games..."

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') 

20.times do
    Game.create(
    
            name: Faker::Game.title,
            release_date: rand(1980..2021),
            price: rand(10..60),
            image: Faker::Avatar.image,
            genre: Faker::Game.genre,
        )
    end

puts "✅ Done seeding!"