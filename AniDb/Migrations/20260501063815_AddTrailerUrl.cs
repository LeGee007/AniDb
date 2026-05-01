using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AniDb.Migrations
{
    /// <inheritdoc />
    public partial class AddTrailerUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TrailerUrl",
                table: "Animes",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrailerUrl",
                table: "Animes");
        }
    }
}
