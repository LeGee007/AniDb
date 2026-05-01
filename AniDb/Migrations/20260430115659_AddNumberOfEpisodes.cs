using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AniDb.Migrations
{
    /// <inheritdoc />
    public partial class AddNumberOfEpisodes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfEpisodes",
                table: "Animes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfEpisodes",
                table: "Animes");
        }
    }
}
